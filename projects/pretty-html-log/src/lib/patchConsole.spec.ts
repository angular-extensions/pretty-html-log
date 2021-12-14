describe('Add global', () => {
  it('should add a logNgHTML method to the global', () => {
    expect((global as any).logNgHTML).not.toBeDefined();
    require('./patchConsole');
    expect((global as any).logNgHTML).toBeDefined();
  });
});
