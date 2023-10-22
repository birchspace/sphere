import Link from "next/link";
import { Kbd } from "@nextui-org/react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

interface ListItemProps {
  highlighted: string;
  setHighlighted: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  heading: string | number;
  text: string;
  herf: string;
}

export function ListItem({
  highlighted,
  setHighlighted,
  value,
  heading,
  text,
  herf,
}: ListItemProps) {
  return (
    <div
      onMouseEnter={() => setHighlighted(value)}
      className={`${
        highlighted === value ? "bg-neutral-800" : "bg-neutral-900"
      } cursor-default rounded-md p-5 duration-100`}
    >
      <p className="mb-2 break-all text-lg tracking-wide">{text}</p>
      <span className="flex items-center justify-end space-x-0.5 text-xs">
        <Popover showArrow placement="bottom">
          <PopoverTrigger>
            <Button
              className="text-xs"
              color="default"
              variant="ghost"
              size="sm"
            >
              More
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-1">
            <Card
              shadow="none"
              className="max-w-[300px] border-none bg-transparent"
            >
              <CardBody className="p-2">
                <div className="space-x-4">
                  <span>Pub:</span>
                  <Link
                    href={herf}
                    className="pb-1 font-display  font-semibold capitalize text-neutral-50"
                  >
                    {heading}
                  </Link>
                </div>
              </CardBody>
            </Card>
          </PopoverContent>
        </Popover>
      </span>
    </div>
  );
}
