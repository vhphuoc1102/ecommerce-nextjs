import {Specification} from "@/libs/types/productType";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default function ProductSpecificationTable({specification} : Specification) {
  const specEntries = Array.from(specification.entries())
  return (
      <Table>
        <TableCaption>For more detail, &nbsp;
          <a href={"#"} className={"text-primary underline"}>
            click here
          </a>
        </TableCaption>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="w-1/2 text-primary-foreground">Attribute</TableHead>
            <TableHead className="w-1/2 text-primary-foreground">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specEntries.map(([attribute, value], index) => (
              <TableRow key={attribute} className={index % 2 === 0 ? "bg-secondary/50" : ""}>
                <TableCell className="font-medium">{attribute}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}
