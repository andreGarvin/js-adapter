import { WindowIdentity } from "../../identity"
import Transport from "../../transport/transport"
const DEFAULT_DURATION = 1000

export default class Animation {
    protected payload

    constructor(protected wire: Transport, protected identity: WindowIdentity, interrupt: boolean) {
        this.payload = { options: { interrupt }}
    }

    size(width?: number, height?: number, duration = DEFAULT_DURATION) {
        Object.assign(this.payload, { size: { width, height, duration }})
    }
    position(left?: number, top?: number, duration = DEFAULT_DURATION) {
        Object.assign(this.payload, { position: { left, top, duration }})
    }
    opacity(opacity: number, duration = DEFAULT_DURATION) {
        Object.assign(this.payload, { opacity: { opacity, duration }})
    }

    animate(): Promise<void> {
        return this.wire.sendAction("animate-window", this.identity.mergeWith(this.payload))
    }
}