import { IsNotEmpty, IsUrl } from "class-validator";

export class GitRequest {
  @IsNotEmpty({
    message: "O código deve ser informado",
  })
  code: string;

  @IsUrl({
    require_tld: false,
  }, {
    message: "A URL informada é inválida",
  })
  redirectUrl: string;
}
