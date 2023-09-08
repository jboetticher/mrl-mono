import { Card, CardContent } from "@mui/material";
import { CSSProperties, PropsWithChildren } from "react";



export default ({ children, style }: PropsWithChildren<{ style?: CSSProperties }>) => (
    <Card style={{ backgroundColor: 'rgb(45, 66, 77)', ...style }}>
        <CardContent>
            {children}
        </CardContent>
    </Card>
)