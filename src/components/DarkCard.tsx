import { Card, CardContent } from "@mui/material";
import { PropsWithChildren } from "react";



export default ({ children }: PropsWithChildren<{}>) => (
    <Card style={{ backgroundColor: 'rgb(45, 66, 77)' }}>
        <CardContent>
            {children}
        </CardContent>
    </Card>
)