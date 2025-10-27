/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";

// Componente personalizado para renderizar tabelas
const Table = ({ children }) => {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%", minWidth: "600px" }}>
      {children}
    </table>
  );
};

// Componente personalizado para renderizar linhas da tabela
const TableRow = ({ children }) => {
  return <tr style={{ borderBottom: "1px dashed #3e4547" }}>{children}</tr>;
};

// Componente personalizado para renderizar células da tabela
const TableCell = ({ children, isHeader }) => {
  const Tag = isHeader ? "th" : "td";
  return (
    <Tag
      style={{
        padding: "8px",
        textAlign: "left",
        border: "1px dashed #3e4547",
        whiteSpace: "nowrap",
        color: "white",
        backgroundColor: isHeader ? "#2d3336" : "transparent",
      }}
    >
      {children}
    </Tag>
  );
};

export default function OutputTable({ data }) {
  const [markdownTable, setMarkdownTable] = useState("");

  useEffect(() => {
    const generateMarkdownTable = () => {

      // Veirifca se a tablea for vazia para criar o cabeçalho com os campos fiels
      let headers = [];
      let tableRows = "";
      
      if (data.rows && data.rows.length > 0) {
        headers = Object.keys(data.rows[0]);
        tableRows = data.rows
          .map((row) => `| ${headers.map((header) => row[header]).join(" | ")} |`)
          .join("\n");
      } else if (data.fields && data.fields.length > 0) {
        headers = data.fields.map((field) => field.name);
        // Se não há linhas, não haverá corpo da tabela
        tableRows = `| ${headers.map(() => " ").join(" | ")} |`;
      } else {
        // Se não houver cabeçalho, não monta a tabela
        return;
      }

      const headerRow = `| ${headers.join(" | ")} |`;
      const separatorRow = `| ${headers.map(() => "---").join(" | ")} |`;
      const markdownTable = `${headerRow}\n${separatorRow}\n${tableRows}`;

      setMarkdownTable(markdownTable);
    };

    generateMarkdownTable();
  }, [data]);

  return (
    <div className="h-full w-full overflow-auto bg-[#131315]">
      <Markdown
        options={{
          overrides: {
            table: Table, // Usa o componente personalizado para tabelas
            tr: TableRow, // Usa o componente personalizado para linhas
            th: { component: TableCell, props: { isHeader: true } }, // Cabeçalho
            td: TableCell, // Células normais
          },
        }}
      >
        {markdownTable}
      </Markdown>
    </div>
  );
}