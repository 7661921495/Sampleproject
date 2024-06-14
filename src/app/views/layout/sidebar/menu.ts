import { MenuItem } from './menu.model';
var level=  localStorage.getItem('RoleId')
var admin = localStorage.getItem('AdminRole')
export const MENU: MenuItem[] = [
 

  // {
  //   label: 'User Management',
  //   isTitle: true,
    
  // },
  // {
  //   label: 'Partner',
  //   icon: 'user-plus',
  //   // disable : !(admin?.includes('2')),
  //  link: '/user-management/user',
  // },
  // {
  //   label: 'User',
  //   icon: 'user-plus',
  //   // disable : !(admin?.includes('2')),
  //  link: '/user-management/user',
  // },
  // {
  //   label: 'Plan',
  //   icon: 'user-plus',
  //   // disable : !(admin?.includes('2')),
  //  link: '/user-management/user',
  // },

  
  {
    label: 'Customer',
    isTitle: true,
    
  },
  
  {
    label: 'Customer Lookup',
    icon: 'user-check',
    link: '/customer/lookup'
   
  },

  {
    label: 'Activation',
    icon: 'smartphone',
    link: '/customer/activation-request'
   
  },
  
  // {
  //   label: 'Email',
  //   icon: 'mail',
  //   subItems: [
  //     {
  //       label: 'Inbox',
  //       link: '/apps/email/inbox',
  //     },
  //     {
  //       label: 'Read',
  //       link: '/apps/email/read'
  //     },
  //     {
  //       label: 'Compose',
  //       link: '/apps/email/compose'
  //     },
  //   ]
  // },

  

  // {
  //   label: 'Operations',
  //   isTitle: true,
    
  // },
 
  // {
  //   label: 'Partners API Log',
  //   icon: 'layers',
   
  // },
  // {
  //   label: 'Carrier Logs',
  //   icon: 'layers',
   
  // },


 
  
];

