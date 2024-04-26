import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import AdfScannerOutlinedIcon from '@mui/icons-material/AdfScannerOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import SsidChartOutlinedIcon from '@mui/icons-material/SsidChartOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
export const SidebarData = [
  {
    title: 'Home',
    icon: <HomeOutlinedIcon />,
    link: '/'
  },
  {
    title: 'DashBoard',
    icon: <SpaceDashboardOutlinedIcon />,
    link: '/dashboard'
  },

  // {
  //   title: 'Maps',
  //   icon: <LocationOnOutlinedIcon />,
  //   link: '/maps'
  // },
  {
    title: 'Alarms',
    icon: <WarningAmberOutlinedIcon />,
    link: '/alarm'
  },
  {
    title: 'Trends',
    icon: < SsidChartOutlinedIcon />,
    link: '/metric'
  },
  {
    title: 'Reports',
    icon: <AdfScannerOutlinedIcon />,
    link: '/report'
  },

  {
    title: 'Users',
    icon: < PeopleAltOutlinedIcon />,
    link: '/userauthencation'
  },
]

