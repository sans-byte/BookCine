import React, { useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { addTheater, updateTheater } from "../../services/theaterService";
const { Option } = Select;

function TheaterForm({
  showTheaterForm,
  setShowTheaterForm,
  setSelectedTheater,
  selectedTheater,
  formType,
  getAllTheatersByOwnerData,
}) {
  const [form] = Form.useForm();

  const onClose = () => {
    setSelectedTheater(null);
    setShowTheaterForm(false);
  };

  //Names of states for the dropdown
  const states = [
    { name: "Andhra Pradesh" },
    { name: "Arunachal Pradesh" },
    { name: "Assam" },
    { name: "Bihar" },
    { name: "Chhattisgarh" },
    { name: "Goa" },
    { name: "Gujarat" },
    { name: "Haryana" },
    { name: "Himachal Pradesh" },
    { name: "Jharkhand" },
    { name: "Karnataka" },
    { name: "Kerala" },
    { name: "Madhya Pradesh" },
    { name: "Maharashtra" },
    { name: "Manipur" },
    { name: "Meghalaya" },
    { name: "Mizoram" },
    { name: "Nagaland" },
    { name: "Odisha" },
    { name: "Punjab" },
    { name: "Rajasthan" },
    { name: "Sikkim" },
    { name: "Tamil Nadu" },
    { name: "Telangana" },
    { name: "Tripura" },
    { name: "Uttar Pradesh" },
    { name: "Uttarakhand" },
    { name: "West Bengal" },
  ];

  const dispatch = useDispatch();
  // on form submit add theater to the database
  const { user } = useSelector((state) => state.users);
  const onFinish = async (values) => {
    try {
      values.owner = user._id;
      dispatch(showLoading());
      let response = null;
      if (formType == "add") {
        response = await addTheater(values);
      } else {
        // edit theater logic
        response = await updateTheater({ _id: selectedTheater._id, ...values });
      }
      if (response.success) {
        message.success(response.message);
        setShowTheaterForm(false);
        setSelectedTheater(null);
        getAllTheatersByOwnerData();
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(hideLoading());
    }
    console.log(values);
  };

  useEffect(() => {
    form.resetFields();
  });

  return (
    <div>
      <Drawer
        title="ADD YOUR THEATER!"
        width={500}
        onClose={onClose}
        open={showTheaterForm}
        bodyStyle={{
          paddingBottom: 80,
        }}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //   </Space>
        // }
      >
        <Form
          layout="vertical"
          initialValues={selectedTheater}
          requiredMark
          form={form}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter theater name",
                  },
                ]}
              >
                <Input placeholder="Please enter theater name" type="text" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    // type: "email",
                    message: "Please enter email",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  addonAfter=".com"
                  placeholder="Please enter email"
                  type="email"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="screens"
                label="Screens"
                rules={[
                  {
                    required: true,
                    message: "Please enter number of screens",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please enter screen number"
                  type="number"
                  min={1}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter phone number",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  addonBefore="+91"
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="0000000000"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please enter address",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please enter address"
                  type="text"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="city"
                label="City"
                rules={[
                  {
                    required: true,
                    message: "Please choose the city",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please enter city"
                  type="text"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="state"
                label="State"
                rules={[
                  {
                    required: true,
                    message: "Please choose the state",
                  },
                ]}
              >
                <Select placeholder="Please select the state">
                  {states.map((state, key) => (
                    <Option key={key} value={state.name}>
                      {state.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="sumbit">
            Submit
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default TheaterForm;
