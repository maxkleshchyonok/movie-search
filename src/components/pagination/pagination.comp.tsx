import colors from "@/helpers/index";
import styled from "@emotion/styled";
import { Pagination } from "@mantine/core";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function PaginationElement() {
  const [activePage, setActivePage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (activePage) {
      newSearchParams.set("page", activePage.toString());
    }
    router.push(`?${newSearchParams.toString()}`);
  }, [activePage, searchParams]);

  return (
    <Pagination
      total={499}
      boundaries={0}
      siblings={1}
      value={activePage}
      onChange={setActivePage}
      color={colors["purple-500"]}
      sx={{ marginLeft: "70%" }}
      styles={{
        dots: {
          display: "none",
        },
      }}
    />
  );
}

export default PaginationElement;
