test('mx message called', () => {
    mx.message("Hello World!");
    expect(mx.message).toHaveBeenCalledWith("Hello World!");
});

test('get running order called', () => {
    expect(mx.get_running_order()).toEqual([{
        slot: 0,
        position: 0,
        time: 0
    }]);
    expect(mx.get_running_order).toHaveBeenCalled();
});

test('max slots value correct', () => {
    expect(mx.max_slots).toBe(160);
});