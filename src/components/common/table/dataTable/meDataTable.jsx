import { useState, useMemo } from "react";
import { EllipsisIcon } from "lucide-react";

import _ from "lodash";

import { Button } from "@MEShadcnComponents/button";
import { useSidebar } from "@MEShadcnComponents/sidebar";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@MEShadcnComponents/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@MEShadcnComponents/dropdown-menu";

const MEDataTableComponent = (props) => {
  const { columnConfigration, rows } = props;

  const { open, isMobile } = useSidebar();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const pageSizeOptions = [5, 10, 15, 25, 50];

  // Calculate pagination data
  const totalRows = rows?.length || 0;
  const totalPages = Math.ceil(totalRows / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get paginated rows
  const paginatedRows = useMemo(() => {
    if (!rows) return [];
    return rows.slice(startIndex, endIndex);
  }, [rows, startIndex, endIndex]);

  // Pagination handlers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const getColumnStyle = (col) => {
    if (!col.width) return {};

    const width = typeof col.width === "string" ? col.width : `${col.width}px`;
    return {
      minWidth: width,
      maxWidth: width,
    };
  };

  return (
    <div
      className={`${open && !isMobile ? "w-[calc(100vw-290px)]" : "w-full"} max-w-full rounded-lg border border-border bg-card shadow-sm overflow-hidden flex flex-col`}
    >
      {/* Scrollable Table Content */}
      <div className="flex-1 overflow-x-auto overflow-y-auto min-h-0">
        <Table className="min-w-full table-auto">
          <TableHeader className="bg-primary">
            <TableRow className="bg-primary border-b border-primary-foreground/10">
              {_.map(columnConfigration, (col) => (
                <TableHead
                  key={col.key}
                  className="text-secondary px-4 py-3 text-left font-medium whitespace-nowrap bg-primary sticky top-0 z-20 shadow-sm"
                  style={getColumnStyle(col)}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRows && paginatedRows.length > 0 ? (
              _.map(paginatedRows, (row, rowIndex) => (
                <TableRow key={rowIndex} className="border-b hover:bg-muted/50">
                  {_.map(columnConfigration, (col) => {
                    if (col.key === "actions") {
                      return (
                        <TableCell
                          key={col.key}
                          className="px-4 py-3 text-sm whitespace-nowrap"
                          style={getColumnStyle(col)}
                        >
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="icon"
                                size="sm"
                                className={"hover:cursor-pointer"}
                              >
                                <EllipsisIcon />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel className={"text-xs"}>
                                Actions
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuGroup>
                                {_.map(
                                  col.actionList,
                                  (action, actionIndex) => {
                                    return (
                                      <DropdownMenuItem
                                        key={actionIndex}
                                        onSelect={() =>
                                          col.onActionSelect(action, row)
                                        }
                                      >
                                        {action.label}
                                      </DropdownMenuItem>
                                    );
                                  },
                                )}
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell
                        key={col.key}
                        className="px-4 py-3 text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                        style={getColumnStyle(col)}
                      >
                        {row[col.key] || "-"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnConfigration.length}
                  className="text-center py-8 text-muted-foreground"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Static Pagination Footer */}
      <div className="border-t bg-muted/50 p-3 sm:p-4">
        {/* Single Line Pagination Layout for All Screens */}
        <div className="flex items-center justify-between gap-4">
          {/* Left: Page Size Dropdown */}
          <div className="flex items-center gap-2">
            <select
              className="rounded border border-input bg-background px-2 py-1 text-xs sm:text-sm focus:ring-2 focus:ring-ring focus:outline-none min-w-12.5 sm:min-w-15"
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
              Records
            </span>
          </div>

          {/* Center: Current Page Info */}
          <div className="flex items-center">
            <span className="text-xs sm:text-sm text-muted-foreground text-center">
              <span className="hidden sm:inline">
                Page {currentPage} of {totalPages}
              </span>
              <span className="sm:hidden">
                {currentPage}/{totalPages}
              </span>
            </span>
          </div>

          {/* Right: Navigation Buttons */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-7 w-7 sm:h-8 sm:w-8 p-0"
              title="Previous page"
            >
              ‹
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-7 w-7 sm:h-8 sm:w-8 p-0"
              title="Next page"
            >
              ›
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MEDataTableComponent;
