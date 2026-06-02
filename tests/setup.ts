const mxMock = {
    message: vi.fn(),
    frame_handler: vi.fn(),
    get_running_order: vi.fn().mockReturnValue([]),
};

(global as any).mx = mxMock;
