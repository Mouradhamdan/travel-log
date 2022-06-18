import { User } from "../../models/index.js";
import Bcrypt from "bcrypt";

class UserSeeder {
  static async seed() {
    const userData = [
      {
        email: "admin@admin.com",
        cryptedPassword: Bcrypt.hashSync("cheese", 10),
      },
      {
        email: "middleAgedJennifer@admin.com",
        cryptedPassword: Bcrypt.hashSync("manhattan", 10),
      },
      {
        email: "trello@admin.com",
        cryptedPassword: Bcrypt.hashSync("loveLife", 10),
      },
    ];

    for (const singleUser of userData) {
      const currentUser = await User.query().findOne(singleUser);
      if (!currentUser) {
        await User.query().insert(singleUser);
      }
    }
  }
}

export default UserSeeder;
