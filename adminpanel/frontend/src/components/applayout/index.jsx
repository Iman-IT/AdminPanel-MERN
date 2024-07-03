import React, { useState } from "react";
// import SideNavBar from "../sideNavBar";
import Sider from '../sider/index'
import styles from "./styles.module.scss";


const AppLayout = ({ children }) => {
  console.log(styles);
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <section className={styles["layout"]}>
      <aside
        className={styles["sidebar-container"]}
        trigger={null}
        collapsible
        collapsed={collapsed}
       
      >
        <Sider/>
      </aside>

      <header>
        {/* <CustomHeader collapsed={collapsed} toggle={toggle} /> */}
      </header>

      <section className={styles[ "content" ]}>
   
        {children}
      
    
      </section>
    </section>
  );
};

export default AppLayout;
