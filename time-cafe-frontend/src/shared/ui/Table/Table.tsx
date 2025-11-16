"use client"
import React, { useState } from "react";
import styles from "./Table.module.scss";
import { MetaResponse } from "@/shared/api";

type ColumnConfig<Data> =
  | keyof Data
  | { view: (data: Data) => React.ReactNode };

export interface TableProps<Data> {
  columns: Record<string, ColumnConfig<Data>>;
  data?: Data[] | null;
  isLoading: boolean;
  meta?: MetaResponse;
  onPageChange?: (page: number) => void;
}

export function Table<Data>({
  columns,
  data,
  isLoading,
  meta,
  onPageChange,
}: TableProps<Data>) {
  if (isLoading) return <>Загрузка...</>;

  if (!data || data.length === 0 || !meta) return <>Нет данных</>;
  return (
    <>
      <table className={styles.Table}>
        <thead>
          <tr>
            {Object.keys(columns).map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.entries(columns).map(([colName, colConf]) => {
                if (typeof colConf === "string") return <td key={colName}>{String(row[colConf])}</td>;
                if (typeof colConf === "object" && "view" in colConf) return <td key={colName}>{colConf.view(row)}</td>;
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {meta && meta.last_page >= 1 && (
        <div className={styles.Pagination}>
          <button
            disabled={meta.current_page === 1}
            onClick={() => onPageChange?.(meta.current_page - 1)}
            className={styles.NavButton}
          >
            ‹
          </button>

          {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              className={`${styles.PageButton} ${pageNum === meta.current_page ? styles.Active : ""}`}
              onClick={() => onPageChange?.(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          <button
            disabled={meta.current_page === meta.last_page}
            onClick={() => onPageChange?.(meta.current_page + 1)}
            className={styles.NavButton}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
