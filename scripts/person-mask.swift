import CoreImage
import Foundation
import Vision

@available(macOS 14.0, *)
func dressedSubjects(_ foreground: VNInstanceMaskObservation, _ people: CVPixelBuffer, _ handler: VNImageRequestHandler) throws -> CVPixelBuffer? {
    let labels = foreground.instanceMask
    guard CVPixelBufferGetPixelFormatType(labels) == kCVPixelFormatType_OneComponent8 else { return nil }
    CVPixelBufferLockBaseAddress(labels, .readOnly)
    CVPixelBufferLockBaseAddress(people, .readOnly)
    defer { CVPixelBufferUnlockBaseAddress(people, .readOnly); CVPixelBufferUnlockBaseAddress(labels, .readOnly) }
    let w = CVPixelBufferGetWidth(labels), h = CVPixelBufferGetHeight(labels)
    let pw = CVPixelBufferGetWidth(people), ph = CVPixelBufferGetHeight(people)
    let ids = CVPixelBufferGetBaseAddress(labels)!.assumingMemoryBound(to: UInt8.self)
    let human = CVPixelBufferGetBaseAddress(people)!.assumingMemoryBound(to: UInt8.self)
    var total = [Int](repeating: 0, count: 256), hit = total
    for y in 0..<h {
        for x in 0..<w {
            let id = Int(ids[y * CVPixelBufferGetBytesPerRow(labels) + x])
            if id == 0 { continue }
            total[id] += 1
            if human[(y * ph / h) * CVPixelBufferGetBytesPerRow(people) + x * pw / w] > 90 { hit[id] += 1 }
        }
    }
    let selected = IndexSet(foreground.allInstances.filter { $0 < 256 && hit[$0] > 0 && hit[$0] * 3 >= total[$0] })
    return selected.isEmpty ? nil : try foreground.generateScaledMaskForImage(forInstances: selected, from: handler)
}

// Called before requesting a lighting guide, and again to check that the guide stayed registered.
do {
    let args = CommandLine.arguments
    guard args.count == 3,
          let input = CIImage(contentsOf: URL(fileURLWithPath: args[1]), options: [.applyOrientationProperty: true]) else {
        throw NSError(domain: "image", code: 1)
    }
    let width = Int(input.extent.width), height = Int(input.extent.height)
    guard width > 0, height > 0, width <= 4096, height <= 4096, width * height <= 4200000 else {
        throw NSError(domain: "imageSize", code: 1)
    }
    let segmentation = VNGeneratePersonSegmentationRequest()
    segmentation.qualityLevel = .accurate
    segmentation.outputPixelFormat = kCVPixelFormatType_OneComponent8
    let faces = VNDetectFaceRectanglesRequest()
    let handler = VNImageRequestHandler(ciImage: input)
    try handler.perform([segmentation, faces])
    guard let buffer = segmentation.results?.first?.pixelBuffer else { throw NSError(domain: "mask", code: 1) }
    var mask = CIImage(cvPixelBuffer: buffer)
    if #available(macOS 14.0, *) {
        let request = VNGenerateForegroundInstanceMaskRequest()
        try handler.perform([request])
        if let instances = request.results?.first, let dressed = try dressedSubjects(instances, buffer, handler) {
            // Semantic segmentation can miss clothing. Include only foreground instances that contain people.
            let instanceMask = CIImage(cvPixelBuffer: dressed)
            let semantic = mask.transformed(by: CGAffineTransform(scaleX: instanceMask.extent.width/mask.extent.width, y: instanceMask.extent.height/mask.extent.height))
            mask = instanceMask.applyingFilter("CIMaximumCompositing", parameters: [kCIInputBackgroundImageKey: semantic])
        }
    }
    let scaled = mask.transformed(by: CGAffineTransform(scaleX: CGFloat(width)/mask.extent.width, y: CGFloat(height)/mask.extent.height))
    try CIContext(options: [.useSoftwareRenderer: true]).writePNGRepresentation(of: scaled, to: URL(fileURLWithPath: args[2]), format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)
    let boxes = (faces.results ?? []).map { [$0.boundingBox.midX, $0.boundingBox.midY, $0.boundingBox.width, $0.boundingBox.height] }
    let info: [String: Any] = ["width": width, "height": height, "faces": boxes]
    FileHandle.standardOutput.write(try JSONSerialization.data(withJSONObject: info))
} catch {
    FileHandle.standardError.write(Data("无法识别人物范围或读取图片。\n".utf8))
    exit(1)
}
