import React from "react";
import withAuth from "../../common/HOCs/withAuth";
import ImportButton from "./ImportButton/ImportButton";
import TableCombined from "./TableCombined";
import Dropdowns from "./Dropdowns/Dropdowns";
import ExportButton from "./ExportButton/ExportButton";
import FileListGroup from "./FileListGroup/FileListGroup";
import css from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div className={css.container}>
      <header>Application Header</header>
      <nav>
        <section>
          <Dropdowns />
        </section>
        <section>
          <ImportButton /> <ExportButton />
        </section>
      </nav>
      <main>
        <TableCombined />
      </main>
      <aside>
        <FileListGroup />
      </aside>
    </div>
  );
};

export default withAuth(MainPage);
