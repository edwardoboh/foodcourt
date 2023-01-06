export const success = (data: Record<string, any>, message?: string, meta?: any) => {
    return {
        data,
        message: message || "success",
        meta
    }
}

export const failed = (message?: string, meta?: any) => {
    return {
        data: null,
        message: message || 'failed',
        meta
    }
}