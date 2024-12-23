/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as authAuthImport } from './routes/(auth)/_auth'
import { Route as appAppImport } from './routes/(app)/_app'
import { Route as appAppIndexImport } from './routes/(app)/_app.index'
import { Route as authAuthSignUpImport } from './routes/(auth)/_auth.signUp'
import { Route as authAuthLoginImport } from './routes/(auth)/_auth.login'

// Create Virtual Routes

const authImport = createFileRoute('/(auth)')()
const appImport = createFileRoute('/(app)')()

// Create/Update Routes

const authRoute = authImport.update({
  id: '/(auth)',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const appRoute = appImport.update({
  id: '/(app)',
  getParentRoute: () => rootRoute,
} as any)

const authAuthRoute = authAuthImport.update({
  id: '/_auth',
  getParentRoute: () => authRoute,
} as any)

const appAppRoute = appAppImport.update({
  id: '/_app',
  getParentRoute: () => appRoute,
} as any)

const appAppIndexRoute = appAppIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => appAppRoute,
} as any)

const authAuthSignUpRoute = authAuthSignUpImport.update({
  id: '/signUp',
  path: '/signUp',
  getParentRoute: () => authAuthRoute,
} as any)

const authAuthLoginRoute = authAuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => authAuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/(app)': {
      id: '/(app)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appImport
      parentRoute: typeof rootRoute
    }
    '/(app)/_app': {
      id: '/(app)/_app'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appAppImport
      parentRoute: typeof appRoute
    }
    '/(auth)': {
      id: '/(auth)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/_auth': {
      id: '/(auth)/_auth'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authAuthImport
      parentRoute: typeof authRoute
    }
    '/(auth)/_auth/login': {
      id: '/(auth)/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authAuthLoginImport
      parentRoute: typeof authAuthImport
    }
    '/(auth)/_auth/signUp': {
      id: '/(auth)/_auth/signUp'
      path: '/signUp'
      fullPath: '/signUp'
      preLoaderRoute: typeof authAuthSignUpImport
      parentRoute: typeof authAuthImport
    }
    '/(app)/_app/': {
      id: '/(app)/_app/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appAppIndexImport
      parentRoute: typeof appAppImport
    }
  }
}

// Create and export the route tree

interface appAppRouteChildren {
  appAppIndexRoute: typeof appAppIndexRoute
}

const appAppRouteChildren: appAppRouteChildren = {
  appAppIndexRoute: appAppIndexRoute,
}

const appAppRouteWithChildren =
  appAppRoute._addFileChildren(appAppRouteChildren)

interface appRouteChildren {
  appAppRoute: typeof appAppRouteWithChildren
}

const appRouteChildren: appRouteChildren = {
  appAppRoute: appAppRouteWithChildren,
}

const appRouteWithChildren = appRoute._addFileChildren(appRouteChildren)

interface authAuthRouteChildren {
  authAuthLoginRoute: typeof authAuthLoginRoute
  authAuthSignUpRoute: typeof authAuthSignUpRoute
}

const authAuthRouteChildren: authAuthRouteChildren = {
  authAuthLoginRoute: authAuthLoginRoute,
  authAuthSignUpRoute: authAuthSignUpRoute,
}

const authAuthRouteWithChildren = authAuthRoute._addFileChildren(
  authAuthRouteChildren,
)

interface authRouteChildren {
  authAuthRoute: typeof authAuthRouteWithChildren
}

const authRouteChildren: authRouteChildren = {
  authAuthRoute: authAuthRouteWithChildren,
}

const authRouteWithChildren = authRoute._addFileChildren(authRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof appAppIndexRoute
  '/login': typeof authAuthLoginRoute
  '/signUp': typeof authAuthSignUpRoute
}

export interface FileRoutesByTo {
  '/': typeof appAppIndexRoute
  '/login': typeof authAuthLoginRoute
  '/signUp': typeof authAuthSignUpRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/(app)': typeof appRouteWithChildren
  '/(app)/_app': typeof appAppRouteWithChildren
  '/(auth)': typeof authRouteWithChildren
  '/(auth)/_auth': typeof authAuthRouteWithChildren
  '/(auth)/_auth/login': typeof authAuthLoginRoute
  '/(auth)/_auth/signUp': typeof authAuthSignUpRoute
  '/(app)/_app/': typeof appAppIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/login' | '/signUp'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/login' | '/signUp'
  id:
    | '__root__'
    | '/(app)'
    | '/(app)/_app'
    | '/(auth)'
    | '/(auth)/_auth'
    | '/(auth)/_auth/login'
    | '/(auth)/_auth/signUp'
    | '/(app)/_app/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  appRoute: typeof appRouteWithChildren
  authRoute: typeof authRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  appRoute: appRouteWithChildren,
  authRoute: authRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/(app)",
        "/(auth)"
      ]
    },
    "/(app)": {
      "filePath": "(app)",
      "children": [
        "/(app)/_app"
      ]
    },
    "/(app)/_app": {
      "filePath": "(app)/_app.tsx",
      "parent": "/(app)",
      "children": [
        "/(app)/_app/"
      ]
    },
    "/(auth)": {
      "filePath": "(auth)",
      "children": [
        "/(auth)/_auth"
      ]
    },
    "/(auth)/_auth": {
      "filePath": "(auth)/_auth.tsx",
      "parent": "/(auth)",
      "children": [
        "/(auth)/_auth/login",
        "/(auth)/_auth/signUp"
      ]
    },
    "/(auth)/_auth/login": {
      "filePath": "(auth)/_auth.login.tsx",
      "parent": "/(auth)/_auth"
    },
    "/(auth)/_auth/signUp": {
      "filePath": "(auth)/_auth.signUp.tsx",
      "parent": "/(auth)/_auth"
    },
    "/(app)/_app/": {
      "filePath": "(app)/_app.index.tsx",
      "parent": "/(app)/_app"
    }
  }
}
ROUTE_MANIFEST_END */
