
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CardItemProps{
    title?: string
    value?:any
    desc?: string
    icon?: any
}

const CardItem = ({
    title,
    value,
    desc, 
    icon
}: CardItemProps) => {
    return (
        <Card
            className="relative"
        >
            <CardHeader>
                <CardTitle>{JSON.stringify(value)}</CardTitle>
                <CardDescription>{title}</CardDescription>
            </CardHeader>
            <CardContent
                className="
                    absolute
                    top-[35%]
                    right-0
                    text-neutral-500
                "
            >
                {icon}
            </CardContent>
        </Card>
    );
}
 
export default CardItem;