import { useFormik } from "formik";
import * as React from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import { useInjection } from "Shared/providers/DependencyInjectionProvider";
import { UserRepository } from "Shared/repositories/UserRepository";
import { ROUTE_HOME } from "Shared/routers/routes";
import { initialState, validationSchema } from ".";
import { Props } from "./types";

const LoginPage = (props: Props) => {
  const userRepository = useInjection<UserRepository>("userRepository");

  const formik = useFormik({
    validationSchema,
    initialValues: initialState,
    onSubmit: (values, formikHelpers) => {
      userRepository.login().then(user => {
        props.history.replace(ROUTE_HOME);
      });
    }
  });

  return (
    <Container>
      <Form noValidate onSubmit={formik.handleSubmit}>
        {formik.errors.generalError && (
          <Alert variant="danger">{formik.errors.generalError}</Alert>
        )}

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            required
            type="checkbox"
            label="Remember me"
            name="remember"
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.remember}
            feedback={formik.errors.remember}
            value={formik.values.remember.toString()}
            checked={formik.values.remember}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default withRouter(LoginPage);
