/*
 * Portions of this software was developed by employees of the National Institute
 * of Standards and Technology (NIST), an agency of the Federal Government and is
 * being made available as a public service. Pursuant to title 17 United States
 * Code Section 105, works of NIST employees are not subject to copyright
 * protection in the United States. This software may be subject to foreign
 * copyright. Permission in the United States and in foreign countries, to the
 * extent that NIST may hold copyright, to use, copy, modify, create derivative
 * works, and distribute this software and its documentation without fee is hereby
 * granted on a non-exclusive basis, provided that this notice and disclaimer
 * of warranty appears in all copies.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS' WITHOUT ANY WARRANTY OF ANY KIND, EITHER
 * EXPRESSED, IMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, ANY WARRANTY
 * THAT THE SOFTWARE WILL CONFORM TO SPECIFICATIONS, ANY IMPLIED WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND FREEDOM FROM
 * INFRINGEMENT, AND ANY WARRANTY THAT THE DOCUMENTATION WILL CONFORM TO THE
 * SOFTWARE, OR ANY WARRANTY THAT THE SOFTWARE WILL BE ERROR FREE.  IN NO EVENT
 * SHALL NIST BE LIABLE FOR ANY DAMAGES, INCLUDING, BUT NOT LIMITED TO, DIRECT,
 * INDIRECT, SPECIAL OR CONSEQUENTIAL DAMAGES, ARISING OUT OF, RESULTING FROM,
 * OR IN ANY WAY CONNECTED WITH THIS SOFTWARE, WHETHER OR NOT BASED UPON WARRANTY,
 * CONTRACT, TORT, OR OTHERWISE, WHETHER OR NOT INJURY WAS SUSTAINED BY PERSONS OR
 * PROPERTY OR OTHERWISE, AND WHETHER OR NOT LOSS WAS SUSTAINED FROM, OR AROSE OUT
 * OF THE RESULTS OF, OR USE OF, THE SOFTWARE OR SERVICES PROVIDED HEREUNDER.
 */
import { Injectable } from '@angular/core';

export enum PageGroup {
  navCatSection = 0,
  navProFileSection = 1,
}

export interface Page4UI {
  pageGroup: PageGroup;
  sequence: number;
  title: string;
  url: string;
  icon: string;
  toolTip: string;
  showMenu?: boolean;
}

export interface PrevCurrentNext {
  current: Page4UI;
  next: Page4UI;
  prev: Page4UI;
  nextPages: Array<Page4UI>;
  prevPages: Array<Page4UI>;
}

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  appPartsPages: Array<Page4UI> = [
    {
      pageGroup: PageGroup.navCatSection,
      sequence: 0,
      title: 'Authoring Mode',
      toolTip: 'Select a Catalog or Pick Saved Work',
      url: '/cat-begin',
      icon: 'color-wand' // options, pricetags, push, shuffle
    }, {
      pageGroup: PageGroup.navCatSection,
      sequence: 1,
      title: 'Meta Info',
      toolTip: 'Populate Catalog/Profile Metadata',
      url: '/cat-meta',
      icon: 'finger-print'
    }, {
      pageGroup: PageGroup.navCatSection,
      sequence: 2,
      title: 'Catalog Controls',
      toolTip: 'Include/Exclude a Aet of Families, Controls, Enhancements',
      url: '/cat-select-async',
      icon: 'list' // cafe
    }, {
      pageGroup: PageGroup.navCatSection,
      sequence: 3,
      title: 'Selected Controls',
      toolTip: 'Modify Selected Entities from the Previous Step',
      url: '/pro-edit',
      icon: 'filter' // color-fill
    }, {
      pageGroup: PageGroup.navCatSection,
      sequence: 4,
      title: 'Regroup Controls',
      toolTip: 'Regroup Catalog Entities Selected Earlier',
      url: '/pro-group',
      icon: 'list-circle' // funnel
    },

    //  {
    //   pageGroup: PageGroup.navCatSection,
    //   sequence: 5,
    //   title: 'Back Matter',
    //   toolTip: 'Edit Back Matter ',
    //   url: '/pro-back',
    //   icon: 'attach'
    // },

    // {
    //   pageGroup: PageGroup.navProFileSection,
    //   sequence: 0,
    //   title: 'Review',
    //   toolTip: 'Select a Catalog or Pick Saved Work',
    //   url: '/review',
    //   icon: 'glasses'
    // },
    {
      pageGroup: PageGroup.navProFileSection,
      sequence: 1,
      title: 'Download File',
      toolTip: 'Select a Catalog or Pick Saved Work',
      url: '/save',
      icon: 'cloud-download'
    },
    {
      pageGroup: PageGroup.navProFileSection,
      sequence: 2,
      title: 'Upload File',
      toolTip: 'Select a Catalog or Pick Saved Work',
      url: '/load',
      icon: 'cloud-upload'
    },
  ];
  constructor() { }

  getAllPages() {
    return this.appPartsPages;
  }

  getPagesForGroup(groupName: PageGroup) {
    return this.appPartsPages.filter(m => groupName === m.pageGroup);
  }

  getCurrentPage(urlTail: string): Page4UI {
    const current = this.appPartsPages.filter(m => urlTail === m.url);
    if (current.length === 1) {
      return current[0] || null;
    } else {
      return current[current.length - 1] || null;
    }
  }

  getCurrentNextState(urlTail: string): PrevCurrentNext {
    // console.log(`urlTail:${urlTail}`);
    const currentPage = this.getCurrentPage(urlTail);
    if (currentPage) {
      // console.log(`CurrentGroup=[${currentPage.pageGroup}]; Current UrlTail=${urlTail}`);
      const currentSection = this.getPagesForGroup(currentPage.pageGroup);
      // currentSection.forEach(m =>console.log(`Group: ${currentPage.pageGroup} @${m.url} #${m.sequence}`));

      const nextNum = currentPage.sequence + 1;
      const prevNum = currentPage.sequence - 1;
      const ret: PrevCurrentNext = {
        nextPages: currentSection.filter(m => currentPage.sequence > m.sequence),
        prevPages: currentSection.filter(m => currentPage.sequence < m.sequence),
        next: currentSection.find(m => nextNum === m.sequence) || undefined,
        prev: currentSection.find(m => prevNum === m.sequence) || undefined,
        current: currentPage,
      };
      return ret;
    }
    return null;
  }

}
