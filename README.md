# NPTEL Module POC

## Client Setup

In the root dir of the project, run the following commands:

```bash
cd client
npm install
npm run dev
```

## Server Setup

> Note: It is important to create a virtual env as a best practice and to prevent polluting system packages

### Create a virtual env

```bash
cd server
python -m venv .venv
```
### Activate virtual env

For Windows:

```bash
.\.venv\Scripts\activate
```

For Linux/Mac:

```bash
source ./.venv/bin/activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Saving required packages to requirements

```bash
pip freeze > requirements.txt
```

### Deactivate virtual env

```bash
deactivate
```
