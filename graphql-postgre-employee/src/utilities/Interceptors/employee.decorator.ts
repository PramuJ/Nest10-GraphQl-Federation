import { createParamDecorator, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";


export const EmployeeDec = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      console.log("custom decorator")
      const req = GqlExecutionContext.create(ctx);
      const request = req.getContext().req;
      const emp = request.employeeId
      return emp
    },
  );