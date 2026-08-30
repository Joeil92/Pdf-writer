export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- must match the lib.es5.d.ts type parameter to merge
  interface Uint8Array<TArrayBuffer extends ArrayBufferLike = ArrayBufferLike> {
    toHex(): string
    toBase64(): string
  }

  interface Uint8ArrayConstructor {
    fromBase64(base64: string): Uint8Array
  }

  interface Map<K, V> {
    getOrInsert(key: K, defaultValue: V): V
    getOrInsertComputed(key: K, callback: (key: K) => V): V
  }

  interface WeakMap<K extends WeakKey, V> {
    getOrInsert(key: K, defaultValue: V): V
    getOrInsertComputed(key: K, callback: (key: K) => V): V
  }
}

const BINARY_CHUNK_SIZE = 0x8000

function bytesToBinaryString(bytes: Uint8Array): string {
  let binary = ''
  for (let offset = 0; offset < bytes.length; offset += BINARY_CHUNK_SIZE) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + BINARY_CHUNK_SIZE))
  }
  return binary
}

if (typeof Uint8Array.prototype.toHex !== 'function') {
  Uint8Array.prototype.toHex = function toHex(this: Uint8Array): string {
    let hex = ''
    for (const byte of this) {
      hex += byte.toString(16).padStart(2, '0')
    }
    return hex
  }
}

if (typeof Uint8Array.prototype.toBase64 !== 'function') {
  Uint8Array.prototype.toBase64 = function toBase64(this: Uint8Array): string {
    return btoa(bytesToBinaryString(this))
  }
}

if (typeof Uint8Array.fromBase64 !== 'function') {
  Uint8Array.fromBase64 = function fromBase64(base64: string): Uint8Array {
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return bytes
  }
}

for (const ctor of [Map, WeakMap]) {
  if (typeof ctor.prototype.getOrInsert !== 'function') {
    ctor.prototype.getOrInsert = function getOrInsert(
      this: Map<unknown, unknown>,
      key: unknown,
      defaultValue: unknown
    ): unknown {
      if (!this.has(key)) {
        this.set(key, defaultValue)
      }
      return this.get(key)
    }
  }

  if (typeof ctor.prototype.getOrInsertComputed !== 'function') {
    ctor.prototype.getOrInsertComputed = function getOrInsertComputed(
      this: Map<unknown, unknown>,
      key: unknown,
      callback: (key: unknown) => unknown
    ): unknown {
      if (!this.has(key)) {
        this.set(key, callback(key))
      }
      return this.get(key)
    }
  }
}
