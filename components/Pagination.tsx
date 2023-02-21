import { HStack, ListItem, OrderedList } from "@chakra-ui/react";

const Pagination = ({ dataPerPage, totalData, paginate }) => {
  // console.log("Dataperpage", dataPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  if (pageNumbers.length <= 1) return <>{}</>;
  return (
    <HStack direction={"row"} spacing={0.6}>
      {pageNumbers.map((m) => (
        <a
          href=""
          key={m}
          onClick={(e) => {
            e.preventDefault();
            paginate(m);
          }}
          className="page-item"
        >
          {m}
        </a>
      ))}
    </HStack>
  );
};
export default Pagination;
