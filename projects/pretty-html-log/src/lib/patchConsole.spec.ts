describe('Patch console', () => {
  it('should not contain a console.logNgHTML method', () => {
    expect((console as any).logNgHTML).not.toBeDefined();
  });

  it('should patch the console and add a console.logNgHTML method', () => {
    require('./patchConsole');
    expect((console as any).logNgHTML).toBeDefined();
  });
});
