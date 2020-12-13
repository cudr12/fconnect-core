import { Router } from '../setup/router';
// import { registerController, verifyEmailController, loginController } from '../controllers/authentication/registration-controller';
import { registerController } from '../controllers/authentication/registration-controller';

import joi from 'joi'
import { Method } from '../setup/router/interfaces';
import { API } from '../exposed-interfaces'
import { ValidationSchema } from '../setup/validate'

export function initRoutes (): void {
  const router: Router = new Router();
  addRegistrationRoutes(router);
}

function addRegistrationRoutes(router: Router): void {
  const registerBodyValidation: ValidationSchema<API.V1.Register.POST.RequestBody> = joi.object({
    google_id_token: joi.string().required(),
    student_email: joi.string().email().required(),
  }).required()

  // const registerBodyValidation = {
  //   google_id_token: joi.string().required(),
  //   student_email: joi.string().email().required(),
  //   a: joi.object().keys({
  //     b: joi.string()
  //   })
  // }

  // TODO: use extract interface NPM from joi to get correct interface -> ValidationSchema works only for one level...
  // https://github.com/TCMiranda/joi-extract-type/blob/master/index.ts
  router.exposed (
    'register',
    1,
    registerController,
    {
      body: registerBodyValidation,
    },
    Method.post,
  )

  // router.exposed(
  //   'register/verify/:tracking_id',
  //   1,
  //   verifyEmailController,
  //   {
  //     params: {
  //       tracking_id: joi.string().uuid().required(),
  //     },
  //   },
  //   Method.get,
  // )
  //
  // router.exposed(
  //   'login',
  //   1,
  //   loginController,
  //   {
  //     body: {
  //       google_id_token: joi.string().required(),
  //     }
  //   },
  //   Method.post,
  // )
}
