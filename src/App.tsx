import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button, Form, Input, Modal, Space, Table, Typography } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

function App() {
  const [data, setData] = useState([
    {
      key: "1",
      name: "data_1",
      value: "1",
      items: [
        { key: "1-1", name: "data_1-1", value: "1-1", items: [] },
        { key: "1-2", name: "data_1-2", value: "1-2", items: [] },
      ],
    },
    {
      key: "2",
      name: "data_2",
      value: "2",
      items: [
        { key: "2-1", name: "data_2-1", value: "2-1", items: [] },
        { key: "2-2", name: "data_2-2", value: "2-2", items: [] },
      ],
    },
  ]);
  const [openCreateLevel1Modal, setOpenCreateLevel1Modal] = useState(false);
  const [openDeleteLevel1Modal, setOpenDeleteLevel1Modal] = useState<
    | { open: false }
    | {
        open: true;
        key: string;
      }
  >({ open: false });
  const [form] = Form.useForm();

  return (
    <>
      <Table
        dataSource={data}
        columns={[
          { title: "name", key: "name", dataIndex: "name" },
          { title: "value", key: "value", dataIndex: "value" },
          {
            title: (
              <PlusCircleOutlined
                onClick={() => setOpenCreateLevel1Modal(true)}
              />
            ),
            key: "actions",
            align: "right",
            render: (_, record, idx) => (
              <Space.Compact>
                <EditOutlined />
                <DeleteOutlined
                  onClick={() =>
                    setOpenDeleteLevel1Modal({
                      open: true,
                      key: record.key,
                    })
                  }
                />
              </Space.Compact>
            ),
          },
        ]}
        expandable={{
          expandedRowRender: (field) => (
            <Table
              dataSource={field.items}
              columns={[
                { title: "name", key: "name", dataIndex: "name" },
                { title: "value", key: "value", dataIndex: "value" },
                {
                  title: <PlusCircleOutlined />,
                  key: "actions",
                  align: "right",
                  render: (_, record, idx) => (
                    <Space.Compact>
                      <EditOutlined />
                      <DeleteOutlined />
                    </Space.Compact>
                  ),
                },
              ]}
              pagination={false}
            />
          ),
        }}
        pagination={false}
      />

      <Modal
        title="Add level1"
        transitionName="ant-fade"
        open={openCreateLevel1Modal}
        okText="create"
        onOk={() => {
          form.submit();
          setOpenCreateLevel1Modal(false);
        }}
        onCancel={() => setOpenCreateLevel1Modal(false)}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            console.log(values);
            setData((prev) =>
              prev.concat({ key: values.name, ...values, items: [] })
            );
            form.resetFields();
          }}
        >
          <Form.Item name="name" label="name">
            <Input />
          </Form.Item>
          <Form.Item name="value" label="value">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {openDeleteLevel1Modal.open && (
        <Modal
          title="Confirm to delete?"
          transitionName="ant-fade"
          open
          okText="Confirm"
          onOk={() => {
            setData((prev) =>
              prev.filter((d) => d.key !== openDeleteLevel1Modal.key)
            );
            setOpenDeleteLevel1Modal({ open: false });
          }}
          onCancel={() => setOpenDeleteLevel1Modal({ open: false })}
        >
          <Typography>
            {data.find((d) => d.key === openDeleteLevel1Modal.key)?.name}
          </Typography>
        </Modal>
      )}
    </>
  );
}

export default App;
