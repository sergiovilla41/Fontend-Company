import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryTreeNode } from '../../../../store/model/dataset/datasets.model';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { StyleClassModule } from 'primeng/styleclass';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

interface Column {
  field: string;
  header: string;
}

@Component({
  standalone: true,
  selector: 'simem-tree-table-category-modal',
  templateUrl: './tree-table-category-modal.component.html',
  styleUrl: './tree-table-category-modal.component.scss',
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    TreeModule,
    TreeTableModule,
    StyleClassModule,
    TableModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
})
export class TreeTableCategoryModalComponent implements OnInit {
  categories!: CategoryTreeNode[];
  selectedCategories: TreeNode[] = [];
  cols!: Column[];
  filterMode = 'lenient';
  nameCategory: string | undefined = '';
  constructor(
    public dialogRef: MatDialogRef<TreeTableCategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      treeTableCategory: CategoryTreeNode[];
      idCategorySelected: string;
    }
  ) {}

  ngOnInit(): void {
    this.categories = this.data.treeTableCategory;
    this.cols = [{ field: 'title', header: 'Titulo' }];

    let nodo!: TreeNode | null;
    this.categories.forEach((treenode) => {
      nodo = this.searchIdInTree(treenode, this.data.idCategorySelected);
      if (nodo !== null) {
        this.nameCategory = nodo.label;
        nodo.expanded = true;
        this.selectedCategories.push(nodo);
      }
    });
  }

  onNodeSelect(node: any) {
    if (node.node.key.toString().length === 3) {
      this.selectedCategories = [];
    } else {
      this.selectedCategories = [];
      this.nameCategory = node.node.label;
      this.selectedCategories.push(node.node);
    }
  }
  onNoClick(): void {
    this.dialogRef.close({ result: true, category: {} });
  }
  close(): void {
    this.dialogRef.close({ result: true, category: {} });
  }

  onselecCategory() {
    this.dialogRef.close({
      result: true,
      category: this.selectedCategories[0],
    });
  }

  searchIdInTree(tree: CategoryTreeNode, idBuscado: string): TreeNode | null {
    if (tree.data.id === idBuscado) {
      return tree;
    }
    if (tree.children) {
      for (const hijo of tree.children) {
        const nodefound = this.searchIdInTree(hijo, idBuscado);
        if (nodefound) {
          return nodefound;
        }
      }
    }
    return null;
  }
}
