import { AlertHandler } from "./AlertHandler";

export const HandleGraphQLError = (errors: any): boolean => {
  if (errors && errors?.length > 0) {
    let errorMSG = "";
    errors.map(
      (error: any) =>
        (errorMSG += `<li class="text-base font-semibold">${error.message}</li>`),
    );
    AlertHandler.fire({
      icon: "error",
      title: "Error",
      html: `<ul>${errorMSG}</ul>`,
      confirmButtonColor: "#384E77",
    });
    return false;
  }
  return true;
};
