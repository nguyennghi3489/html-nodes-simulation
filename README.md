# HTML Nodes Simulation

A React-based visual editor for creating and manipulating HTML elements with real-time preview, drag-and-drop functionality, and CSS property inspection.

## Features

- **Interactive Tree View**: Hierarchical display of HTML nodes with expand/collapse functionality
- **Live Preview**: Real-time rendering of HTML elements with visual selection and styling
- **Drag & Drop**: Move elements around the preview area with smooth animations
- **CSS Inspector**: Edit CSS properties in real-time with auto-suggestions and validation
- **Node Selection**: Synchronized selection between tree view and preview

## Project Structure

```
src/
├── components/
│   ├── css-inspector/     # CSS property editing interface
│   ├── preview/           # Visual preview of HTML elements
│   ├── tree-view/         # Hierarchical node tree display
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── models/               # TypeScript type definitions
├── utils/                # Utility functions
├── data/                 # Mock data and examples
└── styles/               # Global styles and variables
```

## Application Flow

1. **Node Management**: HTML nodes are stored in a hierarchical structure with properties like position, dimensions, and styling
2. **Tree Navigation**: Users can browse the node hierarchy in the left sidebar, with expand/collapse controls
3. **Visual Preview**: The center panel renders elements with absolute positioning and real-time updates
4. **Property Editing**: The right panel shows CSS properties for the selected node with inline editing
5. **Drag & Drop**: Elements can be repositioned in the preview area with automatic coordinate updates
6. **Synchronization**: All three panels stay synchronized - selecting a node in one panel highlights it in others

## Core Components

### Tree View

- **TreeNode**: Recursive component for displaying hierarchical structure
- **TreeToggle**: Expand/collapse controls for parent nodes
- Supports nested elements with proper indentation

### Preview

- **Element**: Renders actual HTML elements with styling
- **Draggable**: Wrapper component for drag-and-drop functionality
- Real-time position updates and visual feedback

### CSS Inspector

- **CssInspector**: Main interface for property editing
- **EditableField**: Inline editing with suggestions and validation
- Support for both built-in and custom CSS properties

## Technology Stack

- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **@dnd-kit** for drag-and-drop functionality
- **SCSS** for styling with design tokens
- **Custom Hooks** for state management

## Getting Started

1. **Install Dependencies**

   ```bash
   yarn install
   ```

2. **Start Development Server**

   ```bash
   yarn dev
   ```

## Usage

1. **Select Elements**: Click on any element in the tree view or preview to select it
2. **Edit Properties**: Use the CSS Inspector to modify styling properties
3. **Drag Elements**: Drag elements in the preview to reposition them
4. **Expand Nodes**: Use the toggle buttons in the tree view to expand/collapse containers
5. **Add Properties**: Click in empty space in the CSS Inspector to add custom properties

## Example Data

The application includes two example datasets:

- `exampleNodes1`: Simple layout with header, content, and footer
- `exampleNodes2`: Complex layout with navigation, features, and sidebar

## Development

### Adding New Node Types

1. Update the `TNode` type in `models/node.ts`
2. Add rendering logic in `utils/render.ts`
3. Add default styles in `components/preview/element.scss`

### Extending CSS Properties

1. Add properties to `utils/css-properties.ts`
2. Update property value suggestions
3. Add validation rules if needed
