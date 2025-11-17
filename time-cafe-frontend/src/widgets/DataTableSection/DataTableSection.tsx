import { Table, TableProps } from "@/shared/ui/Table";
import React from "react";
import styles from "./DataTableSection.module.scss"
import { AdminButton } from "@/shared/ui/AdminButton";

interface DataTableSectionProps<Data> extends TableProps<Data> {
  headerActions?: React.ReactNode;
  actions?: (data: Data) => React.ReactNode;
}

export const DataTableSection = <Data,>({
  data,
  columns,
  isLoading,
  meta,
  onPageChange,
  headerActions,
  actions,
}: DataTableSectionProps<Data>) => {
  const enhancedColumns = {
    ...columns,
    ...(actions && { Действия: { view: actions } })
  };

  return (
    <section className={styles.DataTableSection}>
      {headerActions && <div className={styles.DataTableSection__Action}><AdminButton>{headerActions}</AdminButton></div>}
      <Table
        data={data}
        columns={enhancedColumns}
        isLoading={isLoading}
        meta={meta}
        onPageChange={onPageChange}
      />
    </section>
  );
};