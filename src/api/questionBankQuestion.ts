// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** 创建题库题目 POST /api/questionBankQuestion/add */
export async function addQuestionBankQuestionUsingPost(
  body: API.QuestionBankQuestionAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/questionBankQuestion/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除题库题目 POST /api/questionBankQuestion/delete */
export async function deleteQuestionBankQuestionUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/questionBankQuestion/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑题库题目（给用户使用） POST /api/questionBankQuestion/edit */
export async function editQuestionBankQuestionUsingPost(
  body: API.QuestionBankQuestionEditRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/questionBankQuestion/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取题库题目（封装类） GET /api/questionBankQuestion/get/vo */
export async function getQuestionBankQuestionVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionBankQuestionVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseQuestionBankQuestionVO_>(
    "/api/questionBankQuestion/get/vo",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 分页获取题库题目列表（仅管理员可用） POST /api/questionBankQuestion/list/page */
export async function listQuestionBankQuestionByPageUsingPost(
  body: API.QuestionBankQuestionQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageQuestionBankQuestion_>(
    "/api/questionBankQuestion/list/page",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 分页获取题库题目列表（封装类） POST /api/questionBankQuestion/list/page/vo */
export async function listQuestionBankQuestionVoByPageUsingPost(
  body: API.QuestionBankQuestionQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageQuestionBankQuestionVO_>(
    "/api/questionBankQuestion/list/page/vo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 分页获取当前登录用户创建的题库题目列表 POST /api/questionBankQuestion/my/list/page/vo */
export async function listMyQuestionBankQuestionVoByPageUsingPost(
  body: API.QuestionBankQuestionQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageQuestionBankQuestionVO_>(
    "/api/questionBankQuestion/my/list/page/vo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 删除题库题目（给管理员使用） POST /api/questionBankQuestion/remove */
export async function removeQuestionBankQuestionUsingPost(
  body: API.QuestionBankQuestionRemoveRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/questionBankQuestion/remove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新题库题目（仅管理员可用） POST /api/questionBankQuestion/update */
export async function updateQuestionBankQuestionUsingPost(
  body: API.QuestionBankQuestionUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/questionBankQuestion/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
