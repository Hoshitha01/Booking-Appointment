
import { Test } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from './dto/user.dto';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

const user = {
  id: 1,
  userName: "Hoshitha",
  emailId: "hoshitha@gmail.com",
  password: "Hoshi11",
  phoneNumber: "1234567891",

}
const login = {
  emailId: "hoshitha@gmail.com",
  password: "hoshitha"
}
const ImportDto = plainToInstance(UserDTO, User)
describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    let module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, {
        provide: UserService,
        useFactory: () => ({
          registerTheUser: jest.fn(),
          loginTheUser: jest.fn()
        })
      }]
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(UserController).toBeDefined();
  })

  describe('When registerUser()', () => {
    it('should return response', async () => {
      let findOneSpy = jest.spyOn(userService, 'registerTheUser').mockResolvedValue('User registerd successfully');
      let response = await userController.registerUser(ImportDto);
      expect(response).toEqual('User registerd successfully');
      expect(findOneSpy).toHaveBeenCalled()
    })
  })

  describe('When login', () => {
    it('should return response', async () => {
      const token = { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvdW5kYXJpeWFAZ21haWwuY29tIiwiaWF0IjoxNjQyNzQ4NDMxLCJleHAiOjE2NDI4MzQ4MzF9.X3F0VRxXU8s-H86IYgq0aj68WW9wiwVJxrnIlcv_sq8" }


      let getAllHotelsSpy = jest.spyOn(userService, 'loginTheUser').mockResolvedValue(token)
      let response = await userController.userLogin(login);
      expect(response).toEqual(token)
      expect(getAllHotelsSpy).toHaveBeenCalled();
      expect(getAllHotelsSpy).toHaveBeenCalledTimes(1)
    })
  })
})

