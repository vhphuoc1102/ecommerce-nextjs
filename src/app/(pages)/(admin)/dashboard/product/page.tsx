import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectContent
} from "@/components/ui/select";
import {DataTable} from "@/components/table/data-table";
import {columns} from "@/app/(pages)/(admin)/dashboard/product/components/columns";

export default function SearchProductPage(){
  const brands = [
    {id: 1, name: "Apple"},
    {id: 2, name: "Banana"},
    {id: 3, name: "Blueberry"},
    {id: 4, name: "Grapes"},
    {id: 5, name: "Pineapple"}
  ]

  const categories = [
    {id: 1, name: "Apple"},
    {id: 2, name: "Banana"},
    {id: 3, name: "Blueberry"},
    {id: 4, name: "Grapes"},
    {id: 5, name: "Pineapple"}
  ]

  const data = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      title: "Apple",
      brandName: "Apple",
      categoryName: "Fruit",
      price: "100",
      productSn: "123456",
      name: "Apple",
      quantity: 10,
      sold: 5
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      title: "Banana",
      brandName: "Banana",
      categoryName: "Fruit",
      price: "200",
      productSn: "123456",
      name: "Banana",
      quantity: 10,
      sold: 5
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      title: "Blueberry",
      brandName: "Blueberry",
      categoryName: "Fruit",
      price: "300",
      productSn: "123456",
      name: "Blueberry",
      quantity: 10,
      sold: 5
    },
    {
      id: 4,
      image: "https://via.placeholder.com/150",
      title: "Grapes",
      brandName: "Grapes",
      categoryName: "Fruit",
      price: "400",
      productSn: "123456",
      name: "Grapes",
      quantity: 10,
      sold: 5
    },
    {
      id: 5,
      image: "https://via.placeholder.com/150",
      title: "Pineapple",
      brandName: "Pineapple",
      categoryName: "Fruit",
      price: "500",
      productSn: "123456",
      name: "Pineapple",
      quantity: 10,
      sold: 5
    }
  ]
  return (
      <div>
        <Card className="mb-10">
          <CardHeader className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold w-fit">Search product</h1>
            <div className="flex gap-2 items-center">
              <Button>Create product</Button>
              <Button variant={"outline"} className="border-2">Import products</Button>
            </div>
          </CardHeader>
          <CardContent className="mt-4">
            <form>
              <div className="grid grid-cols-12 gap-6">
                <div className="flex gap-1 items-center col-span-4">
                  <label htmlFor="keyword" className="text-xs font-semibold">Keyword:</label>
                  <Input id="keyword" placeholder="Enter keyword" type="text"/>
                </div>
                <div className="flex gap-1 items-center col-span-3">
                  <label htmlFor="brand" className="text-xs font-semibold">Brand:</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {
                          brands.map(brand => (
                              <SelectItem key={brand.id} value={`${brand.id}`}>{brand.name}</SelectItem>
                          ))
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-1 items-center col-span-4">
                  <label htmlFor="category" className="text-xs font-semibold">Category:</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {
                          categories.map(category => (
                              <SelectItem key={category.id} value={`${category.id}`}>{category.name}</SelectItem>
                          ))
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-1 items-center col-span-4">
                  <label htmlFor="verifyStatus" className="text-xs font-semibold text-nowrap">Verify status:</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select verify status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={"VERIFIED"}>Verified</SelectItem>
                        <SelectItem value={"UNVERIFIED"}>Unverified</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-1 items-center col-span-4">
                  <label htmlFor="publishStatus" className="text-xs font-semibold text-nowrap">Publish status:</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select publish status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={"DRAFT"}>Draft</SelectItem>
                        <SelectItem value={"PUBLISH"}>Publish</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 items-center col-span-3">
                  <Button>
                    Search
                  </Button>
                  <Button variant={"destructive"}>
                    Reset
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>`
        </Card>
        <DataTable columns={columns} data={data}/>
      </div>
  );
}
