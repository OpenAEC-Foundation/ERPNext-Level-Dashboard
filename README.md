# ERPNext Level Dashboard

A visual node-based dashboard for ERPNext organizations. View and manage your company structure, employees, departments, and projects in an interactive canvas.

## Features

- **Multi-Instance Support**: Switch between multiple ERPNext instances (InstanceA, 3BM, InstanceC)
- **Interactive Canvas**: Drag, zoom, and pan through your organization
- **Real-time Data**: Live connection to ERPNext via Bridge API
- **Node Types**: Companies, Departments, Employees, Agents, Projects, Tasks
- **Visual Connections**: See reporting relationships and department hierarchies
- **Properties Panel**: Edit node properties directly

## Quick Start

### Option 1: Direct HTML (Development)

```bash
# Start a local server
python3 -m http.server 8081

# Open in browser
open http://localhost:8081/src/index.html
```

### Option 2: With Bridge API (Full Features)

The Bridge API provides a CORS-free proxy to ERPNext instances.

```bash
# Start the bridge (from agent-army/bridge directory)
cd ../bridge
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8002

# Start frontend server
python3 -m http.server 8081

# Open dashboard
open http://localhost:8081/src/index.html
```

## Configuration

### ERPNext Instances

Edit `src/index.html` to configure your ERPNext instances:

```javascript
const ERPNEXT_INSTANCES = {
    impertire: {
        name: 'InstanceA',
        url: 'https://example.erpnext.com',
        apiKey: 'your-api-key',
        apiSecret: 'your-api-secret',
        company: 'Your Company Name',
        color: '#8b5cf6'
    },
    // Add more instances...
};
```

### Bridge API

Configure the Bridge API URL:

```javascript
const ERPNEXT_API = {
    baseUrl: 'http://localhost:8002',  // Bridge API
    // ...
};
```

## Project Structure

```
ERPNext-Level-Dashboard/
├── src/
│   └── index.html      # Main dashboard (single-file app)
├── README.md
└── package.json
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Delete` | Delete selected node |
| `Escape` | Deselect all / Cancel connection |
| `Ctrl+A` | Select all nodes |
| `Ctrl+S` | Save changes |
| Mouse wheel | Zoom in/out |
| Right-click | Context menu (add nodes) |

## Node Types

| Type | Description | ERPNext Doctype |
|------|-------------|-----------------|
| Company | Organization root | Company |
| Department | Organizational unit | Department |
| Employee | Human worker | Employee |
| Agent | AI employee | Employee (is_agent=1) |
| Project | Work project | Project |
| Task | Individual task | Task |

## License

MIT - OpenAEC Foundation
