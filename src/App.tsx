import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Typography } from "./components";

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
  const [openCreateLevel2Modal, setOpenCreateLevel2Modal] = useState<
    | { open: false }
    | {
        open: true;
        key: string;
      }
  >({ open: false });
  const [openDeleteLevel1Modal, setOpenDeleteLevel1Modal] = useState<
    | { open: false }
    | {
        open: true;
        key: string;
      }
  >({ open: false });
  const [openDeleteLevel2Modal, setOpenDeleteLevel2Modal] = useState<
    | { open: false }
    | {
        open: true;
        level1Key: string;
        level2Key: string;
      }
  >({ open: false });
  const [tableForm] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [isEditingLevel1, setIsEditingLevel1] = useState<
    | { editing: false }
    | {
        editing: true;
        key: string;
      }
  >({ editing: false });

  return (
    <>
      <Form
        form={tableForm}
        onFinish={(values) => {
          console.log(values);
          setData((prev) =>
            prev.map((d) =>
              values.key === d.key
                ? {
                    ...d,
                    ...values,
                  }
                : d
            )
          );
        }}
      >
        <Table
          dataSource={data}
          columns={[
            {
              title: "name",
              key: "name",
              dataIndex: "name",
              render: (value, record) =>
                isEditingLevel1.editing &&
                isEditingLevel1.key === record.key ? (
                  <>
                    <Form.Item name="key" hidden></Form.Item>
                    <Form.Item name="name" style={{ margin: 0 }}>
                      <Input />
                    </Form.Item>
                  </>
                ) : (
                  <Typography>{value}</Typography>
                ),
            },
            {
              title: "value",
              key: "value",
              dataIndex: "value",
              render: (value, record) =>
                isEditingLevel1.editing &&
                isEditingLevel1.key === record.key ? (
                  <Form.Item name="value" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
                ) : (
                  <Typography>{value}</Typography>
                ),
            },
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
                  {isEditingLevel1.editing &&
                  isEditingLevel1.key === record.key ? (
                    <CheckCircleOutlined
                      onClick={() => {
                        tableForm.submit();
                        setIsEditingLevel1({ editing: false });
                      }}
                    />
                  ) : (
                    <EditOutlined
                      onClick={() => {
                        tableForm.setFieldsValue({ ...record });
                        setIsEditingLevel1({ editing: true, key: record.key });
                      }}
                    />
                  )}
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
                    title: (
                      <PlusCircleOutlined
                        onClick={() =>
                          setOpenCreateLevel2Modal({
                            open: true,
                            key: field.key,
                          })
                        }
                      />
                    ),
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
      </Form>

      <Modal
        title="Add level1"
        transitionName="ant-fade"
        open={openCreateLevel1Modal}
        okText="create"
        onOk={() => {
          modalForm.submit();
          setOpenCreateLevel1Modal(false);
        }}
        onCancel={() => setOpenCreateLevel1Modal(false)}
        destroyOnClose
      >
        <Form
          form={modalForm}
          layout="vertical"
          preserve={false}
          onFinish={(values) => {
            console.log(values);
            setData((prev) =>
              prev.concat({ key: values.name, ...values, items: [] })
            );
            // modalForm.resetFields();
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

      {openCreateLevel2Modal.open && (
        <Modal
          title="Add level2"
          transitionName="ant-fade"
          open
          okText="create"
          onOk={() => {
            modalForm.submit();
            setOpenCreateLevel2Modal({ open: false });
          }}
          onCancel={() => setOpenCreateLevel2Modal({ open: false })}
          destroyOnClose
        >
          <Form
            form={modalForm}
            layout="vertical"
            preserve={false}
            onFinish={(values) => {
              console.log(values);
              setData((prev) =>
                prev.map((d) =>
                  d.key === openCreateLevel2Modal.key
                    ? { ...d, items: d.items.concat({ ...values, items: [] }) }
                    : d
                )
              );
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
      )}

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
