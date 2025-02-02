"use client"
import { Card, CardContent } from "@/components/ui/card";
import { DevicePhoneMobileIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

interface CategoryItem {
  id: number,
  icon?: string,
  name: string,
  children?: CategoryItem[]
}

export default function CategoryPanel() {
  const [hoveredCategory, setHoveredCategory] = useState<CategoryItem | null>(null);
  const [isDetailHovered, setIsDetailHovered] = useState<boolean>(false);
  const categories: CategoryItem[] =[
        {
          id: 1,
          name: 'Electronics',
          children: [
            {
              id: 1,
              name: 'Mobile Phones',
              children: [
                {
                  id: 1,
                  name: 'Samsung',
                  children: []
                },
                {
                  id: 2,
                  name: 'Apple',
                  children: []
                }
              ]
            },
            {
              id: 2,
              name: 'Laptops',
              children: [
                {
                  id: 1,
                  name: 'Dell',
                  children: []
                },
                {
                  id: 2,
                  name: 'HP',
                  children: []
                }
              ]
            }
          ]
        },
  {
    id: 2,
        name: 'Electronics 2',
      children: [
    {
      id: 1,
      name: 'Mobile Phones',
      children: [
        {
          id: 1,
          name: 'Samsung',
          children: []
        },
        {
          id: 2,
          name: 'Apple',
          children: []
        }
      ]
    },
    {
      id: 2,
      name: 'Laptops',
      children: [
        {
          id: 1,
          name: 'Dell',
          children: []
        },
        {
          id: 2,
          name: 'HP',
          children: []
        }
      ]
    }
  ]
  }
];
  return (
    <div>
      <Card className="w-[15rem]">
        <CardContent className="flex flex-col px-0 pb-0 font-medium relative">
          {categories && categories.length > 0 && categories.map((category) => (
            <div
              key={category.id}
              className="p-2 hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm flex justify-between"
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => !isDetailHovered && setHoveredCategory(null)}
            >
              <div className="flex items-center gap-1">
                {category.icon ? (
                  <div dangerouslySetInnerHTML={{ __html: category.icon }} />
                ) : (
                  <DevicePhoneMobileIcon className="size-4" />
                )}
                <span>{category.name}</span>
              </div>
              <ChevronRightIcon className="size-4" />
            </div>
          ))}
          {hoveredCategory && (
              <div
                  className="absolute left-[15rem] bg-white z-40 min-w-[48rem]"
                  onMouseEnter={() => setIsDetailHovered(true)}
                  onMouseLeave={() => {
                    setIsDetailHovered(false);
                    setHoveredCategory(null);
                  }}
              >
                <Card className="ml-3 min-h-96">
                  <CardContent className="py-2 px-4">
                    <div>
                      {hoveredCategory.children && hoveredCategory.children.length > 0 && (
                          <div className="flex flex-wrap gap-3 text-sm cursor-pointer">
                            {hoveredCategory.children.map((child) => (
                                <div key={child.id} className="flex flex-col gap-1">
                                  <span className="font-semibold hover:font-bold hover:text-primary">{child.name}</span>
                                  <div>
                                    {child.children && child.children.length > 0 && child.children.map((subChild) => (
                                        <div key={subChild.id}>
                                          <span className="hover:font-semibold hover:text-primary">{subChild.name}</span>
                                        </div>
                                    ))}
                                  </div>
                                </div>
                            ))}
                          </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
