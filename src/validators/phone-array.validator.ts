import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { PhoneNumberUtil } from 'google-libphonenumber';

@ValidatorConstraint({ name: 'phone', async: false })
export class PhoneConstraint implements ValidatorConstraintInterface {
  validate(value?: string) {
    if (!value) return false;
    if (!value.includes('+')) {
      value = `+${value.trim()}`;
    }
    const phoneUtil = PhoneNumberUtil.getInstance();
    const phone = phoneUtil.parse(value);
    return phoneUtil.isValidNumber(phone);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments?.property} must be a valid phone number`;
  }
}

export function IsPhone(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'isPhone',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: PhoneConstraint,
    });
  };
}
