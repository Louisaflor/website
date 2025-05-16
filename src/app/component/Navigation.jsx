"use client"; 
import React from 'react';
import styles from '../page.module.scss'

export default function Navigation() {
    let pages = ['About', 'Experienecs', 'Projects']
  return (
    <div className={styles.nav}>
        <p className={styles.name}>Louisa Yonzon</p>
        <div className={styles.pages}>
            {pages.map((page, i) => (
                <span key={i} >
                  {page}
                </span>
            ))}
        </div>
    </div>
  )
}
