import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Permission, Role, User } from '@prisma/client';
import { AuthFilterType } from './auth.model';
import { AUTH_ROLE_KEY } from './auth.constant';
import {
  getCookiesFromContext,
  getRequestFromContext,
  getResponseFromContext,
} from './auth.util';

export const CookiesDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return getCookiesFromContext(context);
  }
);

export const RequestDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return getRequestFromContext(context);
  }
);

export const ResponseDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return getResponseFromContext(context);
  }
);

export const UserDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return getRequestFromContext(context).user as User;
  }
);

/**
 * Decorator for enforcing role-based access
 * @param roles list of roles
 */
export const UseRoles = (roles: AuthFilterType<Role>) => {
  const roleDecorator = SetMetadata(AUTH_ROLE_KEY, roles);
  return roleDecorator;
};

/**
 * Decorator for enforcing permission-based access
 * @param permissions list of permissions
 */
export const UsePermissions = (permissions: AuthFilterType<Permission>) => {
  const permissionDecorator = SetMetadata(AUTH_ROLE_KEY, permissions);
  return permissionDecorator;
};
