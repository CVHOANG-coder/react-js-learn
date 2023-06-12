import {
    Box,
    Card,
    CardContent,
    Checkbox,
    CheckboxProps,
    FormControlLabel,
    FormGroup,
    MenuItem,
    TextField,
    Typography,
} from "@material-ui/core";
import { Field, Form, Formik, useField } from "formik";
import React from "react";
import { InvestmentDetails } from "./InvestmentDetails";
import { boolean, number, object, string } from "yup";

type Props = {};
const initialValues: InvestmentDetails = {
    fullName: "",
    initialInvestment: undefined,
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
                    })}
                    initialValues={initialValues}
                    onSubmit={() => {}}
                >
                    {({ values, errors }) => (
                        <Form>
                            <Box marginBottom={2}>
                                <FormGroup>
                                    <Field
                                        name="fullName"
                                        as={TextField}
                                        label="Full name"
                                    />
                                </FormGroup>
                            </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                    <Field
                                        name="initialInvestment"
                                        type="number"
                                        as={TextField}
                                        label="Initial investment"
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
                            </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                    <Field
                                        name="commentAboutInvestmentRisk"
                                        as={TextField}
                                        multiline
                                        rows={3}
                                        rowsMax={10}
                                    />
                                </FormGroup>
                            </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                    <Field
                                        name="dependents"
                                        as={TextField}
                                        select
                                    >
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={0}>0</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                    </Field>
                                </FormGroup>
                            </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                    <MyCheckbox
                                        name="acceptedTermsAndConditions"
                                        value="High"
                                        label="Accept terms and conditions"
                                    />
                                </FormGroup>
                            </Box>
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
