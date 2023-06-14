import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    CheckboxProps,
    FilledTextFieldProps,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    MenuItem,
    OutlinedTextFieldProps,
    StandardTextFieldProps,
    TextField,
    TextFieldProps,
    Typography,
} from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import React from "react";
import { InvestmentDetails } from "./InvestmentDetails";
import { array, boolean, mixed, number, object, string } from "yup";

type Props = {};
const initialValues: InvestmentDetails = {
    fullName: "",
    initialInvestment: 0,
    investmentRisk: [],
    commentAboutInvestmentRisk: "",
    dependents: -1,
    acceptedTermsAndConditions: false,
};
export default function FormDemo({}: Props) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h4">New Account</Typography>
                <Formik
                    validationSchema={object({
                        fullName: string()
                            .required("Your name is mandatory!!")
                            .min(2)
                            .max(100),
                        initialInvestment: number().required().min(100),
                        dependents: number().required().min(0).max(5),
                        acceptedTermsAndConditions: boolean().oneOf([true]),
                        investmentRisk: array(
                            string().oneOf(["High", "Medium", "Low"])
                        ).min(1),
                        commentAboutInvestmentRisk: mixed().when(
                            "investmentRisk",
                            {
                                is: (investmentRisk: string[]) =>
                                    investmentRisk.find((ir) => ir === "High"),
                                then: () =>
                                    string().required().min(20).max(100),
                                otherwise: () => string().min(20).max(100),
                            }
                        ),
                    })}
                    initialValues={initialValues}
                    onSubmit={(values, formikHelpers) => {
                        return new Promise((res: Function) => {
                            setTimeout(() => {
                                console.log(values);
                                console.log(formikHelpers);
                                res();
                            }, 5000);
                        });
                    }}
                >
                    {({
                        values,
                        errors,
                        isSubmitting,
                        isValidating,
                        touched,
                    }) => (
                        <Form>
                            <Box marginBottom={2}>
                                <FormGroup>
                                    <MyTextField
                                        name="fullName"
                                        label="Full name"
                                        helperText={errors.fullName}
                                    />
                                </FormGroup>
                            </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                    <MyTextField
                                        name="initialInvestment"
                                        type="number"
                                        label="Initial investment"
                                        helperText={errors.initialInvestment}
                                    />
                                </FormGroup>
                            </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                    <MyCheckbox
                                        name="investmentRisk"
                                        value="High"
                                        label="High-Super Risky"
                                    />
                                    <MyCheckbox
                                        name="investmentRisk"
                                        value="Medium"
                                        label="Medium-Risky"
                                    />
                                    <MyCheckbox
                                        name="investmentRisk"
                                        value="Low"
                                        label="Low-Safe"
                                    />
                                </FormGroup>
                                {errors.investmentRisk &&
                                touched.investmentRisk ? (
                                    <FormHelperText>
                                        {errors.investmentRisk}
                                    </FormHelperText>
                                ) : null}
                            </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                    <MyTextField
                                        name="commentAboutInvestmentRisk"
                                        multiline
                                        rows={3}
                                        rowsMax={10}
                                        label="commentAboutInvestmentRisk"
                                        helperText={
                                            errors.commentAboutInvestmentRisk
                                        }
                                    />
                                    <ErrorMessage name="commentAboutInvestmentRisk" />
                                </FormGroup>
                            </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                    <Field
                                        name="dependents"
                                        as={TextField}
                                        select
                                        label="dependents"
                                    >
                                        <MenuItem value={-1}>
                                            Select ...
                                        </MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={0}>0</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                    </Field>
                                    <ErrorMessage name="dependents" />
                                </FormGroup>
                            </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                    <MyCheckbox
                                        name="acceptedTermsAndConditions"
                                        label="Accept terms and conditions"
                                    />
                                    <ErrorMessage name="acceptedTermsAndConditions" />
                                </FormGroup>
                            </Box>
                            <Button
                                type="submit"
                                disabled={isSubmitting || isValidating}
                            >
                                Submit
                            </Button>
                            <pre>{JSON.stringify(errors, null, 4)}</pre>
                            <pre>{JSON.stringify(values, null, 4)}</pre>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
}
export interface MyCheckboxProps extends CheckboxProps {
    name: string;
    value?: string | number;
    label?: string;
}

export function MyCheckbox(props: MyCheckboxProps) {
    const [field] = useField({
        name: props.name,
        type: "checkbox",
        value: props.value,
    });
    return (
        <FormControlLabel
            control={<Checkbox {...props} {...field} />}
            label={props.label}
        />
    );
}
export type MyTextFieldProps = (
    | StandardTextFieldProps
    | FilledTextFieldProps
    | OutlinedTextFieldProps
) & {
    name: string;
    value?: string | number;
    label?: string;
    helperText?: string;
};
export function MyTextField(props: MyTextFieldProps) {
    const [field, meta] = useField({
        name: props.name,
        type: "textField",
        value: props.value,
    });
    return (
        <Field
            as={TextField}
            label={props.label}
            {...field}
            {...props}
            error={meta.touched && meta.error}
            helperText={props.helperText}
            variant="standard"
        />
    );
}
