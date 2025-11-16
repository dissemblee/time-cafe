import { Table, TableProps } from "@/shared/ui/Table";
import React from "react";
import styles from "./DataTableSection.module.scss"
import { AdminButton } from "@/shared/ui/AdminButton";

interface DataTableSectionProps<Data> extends TableProps<Data> {
  headerActions?: React.ReactNode;
}

export const DataTableSection = <Data,>({
  data,
  columns,
  isLoading,
  meta,
  onPageChange,
  headerActions,
}: DataTableSectionProps<Data>) => {
  return (
    <section className={styles.DataTableSection}>
      {headerActions && <div className={styles.DataTableSection__Action}><AdminButton>{headerActions}</AdminButton></div>}
      <Table
        data={data}
        columns={columns}
        isLoading={isLoading}
        meta={meta}
        onPageChange={onPageChange}
      />
    </section>
  );
};
