export const success = (data: Record<string, any> | string, message?: string, meta?: any) => {
    return {
        status: "success",
        data,
        message: message || "success",
        meta
    }
}

export const failed = (message?: string, meta?: any) => {
    return {
        status: "failed",
        data: null,
        message: message || 'failed',
        meta
    }
}