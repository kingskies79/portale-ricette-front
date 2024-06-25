import { UserRegister } from "./userRegister";



describe('UserRegister', () => {
  it('should create an instance', () => {
    expect(new UserRegister("", "", "", "")).toBeTruthy();
  });
});
