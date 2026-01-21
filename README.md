# ERPNext Level Dashboard

A visual node-based dashboard for ERPNext organizations. View and manage your company structure, employees, departments, and projects in an interactive canvas.

## Features

- **Multi-Instance Support**: Switch between multiple ERPNext instances
- **Interactive Canvas**: Drag, zoom, and pan through your organization
- **Direct ERPNext Connection**: Communicates directly with ERPNext REST API
- **Settings Panel**: Configure instances and credentials via UI
- **Node Types**: Companies, Departments, Employees, Agents, Projects, Tasks
- **Visual Connections**: See reporting relationships and department hierarchies
- **Properties Panel**: Edit node properties directly

## Quick Start

### 1. Start the Dashboard

```bash
# Start a local server
npm start
# or
python3 -m http.server 8081

# Open in browser
open http://localhost:8081/src/index.html
```

### 2. Configure ERPNext Connection

1. Click the settings button (gear icon) in the top-right corner
2. Select or add an ERPNext instance
3. Enter your ERPNext URL, API Key, API Secret, and Company name
4. Test the connection

### 3. CORS Proxy (Development)

If your ERPNext server doesn't have CORS enabled for localhost, use the included CORS proxy:

```bash
# Start the CORS proxy
node proxy.js

# In the settings panel, enable "Use CORS Proxy"
```

The proxy runs on `http://localhost:3333` and forwards requests to ERPNext with proper CORS headers.

## Configuration

### ERPNext API Credentials

1. In ERPNext, go to **Settings > API Access**
2. Generate an API Key and Secret for your user
3. Enter these credentials in the dashboard settings

### Example Instances

You can configure multiple ERPNext instances in the settings panel. Example configuration:

- **Instance A**: https://company-a.example.com
- **Instance B**: https://company-b.example.com
- **Instance C**: https://company-c.example.com

## Project Structure

```
ERPNext-Level-Dashboard/
├── src/
│   └── index.html      # Main dashboard (single-file app)
├── proxy.js            # CORS proxy for development
├── package.json
└── README.md
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

## Production Deployment

For production use, configure CORS on your ERPNext server to allow requests from your dashboard domain. In ERPNext:

1. Go to **Setup > Website > Website Settings**
2. Add your dashboard domain to "Allow CORS From"

Alternatively, deploy the dashboard on the same domain as ERPNext.

## License

MIT - OpenAEC Foundation
