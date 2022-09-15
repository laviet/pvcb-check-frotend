<template>
    <el-page-header content="Chi tiết" @back="goBackMethod()" />
    <el-row :gutter="20">
        <el-col :span="24">
            <h3 style="text-align: center;">THÔNG TIN HẬU KIỂM <span style="float: right; font-size: 12px;">
                    <el-button size="small" type="text" @click="downloadFileMethod()"><u>Download
                            toàn bộ hồ sơ</u></el-button>
                </span></h3>
            <div style="text-align: center;">
                <el-radio-group v-model="radioModel" style="margin-bottom: 20px;">
                    <el-radio-button label="a">HỒ SƠ CHUYỂN TIỀN</el-radio-button>
                    <el-radio-button label="b">HỢP ĐỒNG CHUYỂN TIỀN</el-radio-button>
                </el-radio-group>
            </div>
        </el-col>
    </el-row>
    <span v-if="radioModel == 'a'">
        <el-row :gutter="20">
            <el-col :span="15">
                <h4>Thông tin file</h4>
                <!-- <img style="width: 200px" src="@/assets/file/qacode.png" /> -->
                <!-- <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk2QkI4RkE3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk2QkI4Rjk3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU2QTEyNzk3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU2QTEyN0E3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WHowqAAAXNElEQVR42uxda4xd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" /> -->
                <!-- <pdf src="@/assets/file/abc.pdf"></pdf> -->
                <!-- <div>
                    <el-upload v-model:file-list="fileList"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
                        :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>
                </div> -->
                <div>
                    <div class="demo-collapse">
                        <!-- <el-upload v-model:file-list="fileList" class="upload-demo" :show-file-list="true"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple
                            :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
                            :limit="3" :on-exceed="handleExceed">
                        </el-upload> -->
                        <el-collapse>
                            <el-collapse-item title="HS chứng minh học phí" name="1">
                                <div :style="{display: 'flex', justifyContent: 'center'}">
                                    <div>
                                        <div :style="{background: 'white', border: '1px solid #999999'}">
                                            <vue-pdf-embed :source="source1" :page="1" :disableAnnotationLayer="true"
                                                :disableTextLayer="true" :height="300" />
                                            <!-- replace vue-pdf-embed to img if source is not pdf -->
                                        </div>
                                        <div
                                            :style="{marginTop: '4px', display: 'flex', justifyContent: 'center', gap: '12px'}">
                                            <el-button type="text" @click="expandDialogVisible = true"><u>Phóng
                                                    to</u></el-button>
                                            <el-button type="text">
                                                <u>
                                                    <a :href="source1" download class="el-collapse-text-button">Tải</a>
                                                </u>
                                            </el-button>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="HS chứng minh sinh hoạt phí" name="2">
                                <div :style="{display: 'flex', justifyContent: 'center'}">
                                    <div>
                                        <div :style="{background: 'white', border: '1px solid #999999'}">
                                            <vue-pdf-embed :source="source2" :page="1" :disableAnnotationLayer="true"
                                                :disableTextLayer="true" :height="300" />
                                            <!-- replace vue-pdf-embed to img if source is not pdf -->
                                        </div>
                                        <div
                                            :style="{marginTop: '4px', display: 'flex', justifyContent: 'center', gap: '12px'}">
                                            <el-button type="text" @click="expandDialogVisible = true"><u>Phóng
                                                    to</u></el-button>
                                            <el-button type="text">
                                                <u>
                                                    <a :href="source2" download class="el-collapse-text-button">>Tải</a>
                                                </u>
                                            </el-button>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="Hộ chiếu (Passport)" name="3">
                                <div :style="{display: 'flex', justifyContent: 'center'}">
                                    <div>
                                        <div :style="{background: 'white', border: '1px solid #999999'}">
                                            <vue-pdf-embed :source="source2" :page="1" :disableAnnotationLayer="true"
                                                :disableTextLayer="true" :height="300" />
                                            <!-- replace vue-pdf-embed to img if source is not pdf -->
                                        </div>
                                        <div
                                            :style="{marginTop: '4px', display: 'flex', justifyContent: 'center', gap: '12px'}">
                                            <el-button type="text" @click="expandDialogVisible = true"><u>Phóng
                                                    to</u></el-button>
                                            <el-button type="text">
                                                <u>
                                                    <a :href="source2" download class="el-collapse-text-button">>Tải</a>
                                                </u>
                                            </el-button>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="Thị thực (Visa)" name="4">
                                <div :style="{display: 'flex', justifyContent: 'center'}">
                                    <div>
                                        <div :style="{background: 'white', border: '1px solid #999999'}">
                                            <vue-pdf-embed :source="source2" :page="1" :disableAnnotationLayer="true"
                                                :disableTextLayer="true" :height="300" />
                                            <!-- replace vue-pdf-embed to img if source is not pdf -->
                                        </div>
                                        <div
                                            :style="{marginTop: '4px', display: 'flex', justifyContent: 'center', gap: '12px'}">
                                            <el-button type="text" @click="expandDialogVisible = true"><u>Phóng
                                                    to</u></el-button>
                                            <el-button type="text">
                                                <u>
                                                    <a :href="source2" download class="el-collapse-text-button">Tải</a>
                                                </u>
                                            </el-button>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="Chứng minh nhân thân" name="5">
                                <div :style="{display: 'flex', justifyContent: 'center'}">
                                    <div>
                                        <div :style="{background: 'white', border: '1px solid #999999'}">
                                            <vue-pdf-embed :source="source2" :page="1" :disableAnnotationLayer="true"
                                                :disableTextLayer="true" :height="300" />
                                            <!-- replace vue-pdf-embed to img if source is not pdf -->
                                        </div>
                                        <div
                                            :style="{marginTop: '4px', display: 'flex', justifyContent: 'center', gap: '12px'}">
                                            <el-button type="text" @click="expandDialogVisible = true"><u>Phóng
                                                    to</u></el-button>
                                            <el-button type="text">
                                                <u>
                                                    <a :href="source2" download class="el-collapse-text-button">Tải</a>
                                                </u>
                                            </el-button>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                    <el-dialog v-model="expandDialogVisible" title="Phóng to" width="50%">
                        <vue-pdf-embed :source="source2" />
                        <!-- replace vue-pdf-embed to img if source is not pdf -->
                    </el-dialog>
                </div>
                <br />
                <h4>Thông tin chi tiết</h4>
                <el-form ref="formRef" :model="inputForm" :rules="rulesData" label-width="140px" class="demo-ruleForm"
                    label-position="top">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Nguồn tiền thanh toán" prop="bankType">
                                <span>Tài khoản thanh toán PVcomBank</span>
                            </el-form-item>
                            <el-form-item label="Mã chuyển tiền" prop="code">
                                <div>{{ inputForm.code }}</div>
                            </el-form-item>
                            <el-form-item label="Số tiền muốn chuyển" prop="money">
                                <span>{{ inputForm.money }}</span>
                            </el-form-item>
                            <el-form-item label="Số tài khoản" prop="accountNumber">
                                <span>{{ inputForm.accountNumber }}</span>
                            </el-form-item>
                            <el-form-item label="Chi phí trong nước tính vào" prop="internalFees">
                                <el-select style="width: 100%" :disabled="true" v-model="inputForm.internalFees">
                                    <el-option label="Chúng tôi" value="sendType" />
                                    <el-option label="Người thụ hưởng" value="recieveType"
                                        :disabled="inputForm.externalFees == 'sendType'" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Tổng chi phí quy đổi" prop="moneyShow">
                                <span>{{ formatterCurrency.format(inputForm.moneyShow) }}</span>
                            </el-form-item>
                            <el-form-item v-if="inputForm.targetTransfer == 'A' || inputForm.targetTransfer == 'B'"
                                label="Đối tượng chuyển tiền" prop="objectTransfer">
                                <span v-if="inputForm.objectTransfer == 'me'">Bản thân</span>
                                <span v-else>Người thân</span>
                            </el-form-item>
                        </el-col>

                        <!-- column 2 -->
                        <el-col :span="12">
                            <el-form-item label="Mục đích chuyển tiền" prop="targetTransfer">
                                <span>{{ inputForm.targetTransferLabel }}</span>
                            </el-form-item>
                            <el-form-item label="Loại tiền tệ" prop="moneyType">
                                <span>{{ inputForm.moneyType }}</span>
                            </el-form-item>
                            <el-form-item label="Tỷ giá ngoại tệ" prop="rate">
                                <!-- <el-input v-model.number="inputForm.rate" readonly autocomplete="off" /> -->
                                <span>{{ formatterCurrency.format(inputForm.rate) }}</span>
                            </el-form-item>
                            <el-form-item label="Số dư khả dụng" prop="balance">
                                <!-- <el-input v-model.number="inputForm.balance" readonly autocomplete="off">
              <template #append>VND</template>
            </el-input> -->
                                <span>{{ formatterCurrency.format(inputForm.balance) }}</span>
                            </el-form-item>
                            <el-form-item label="Chi phí nước ngoài tính vào" prop="externalFees">
                                <el-select :disabled="true" v-model="inputForm.externalFees" style="width: 100%">
                                    <el-option label="Chúng tôi" value="sendType" />
                                    <el-option label="Người thụ hưởng" value="recieveType" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Tổng tiền cần thanh toán" prop="moneyShow">
                                <!-- <el-input v-model.number="inputForm.moneyPay" readonly autocomplete="off">
              <template #append>VND</template>
            </el-input> -->
                                <!-- <ElCurrencyInput v-model="inputForm.moneyPay" :options="{ currency: 'VND', locale: 'de-DE' }" /> -->
                                <span style="font-weight: bold; color: red">{{
                                formatterCurrency.format(inputForm.moneyPay)
                                }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

            </el-col>
            <el-col :span="9">
                <div style="text-align: center; font-weight: bold">Dành cho nhân viên hậu kiểm</div>
                <el-radio-group v-model="inputForm1.check" class="ml-4">
                    <el-radio label="1">Đúng, chính xác, hợp lệ</el-radio>
                    <el-radio label="2">Không đúng, không hợp lệ, chưa chính xác</el-radio>
                </el-radio-group>
                <h4>1. Kiểm tra định dạng các hồ sơ</h4>
                <div>
                    <el-switch v-model="inputForm1.hasStatus1" /> &nbsp;
                    <span>HS chứng minh học phí</span>
                </div>
                <div>
                    <el-switch v-model="inputForm1.hasStatus2" /> &nbsp;
                    <span>HS chứng minh sinh hoạt phí</span>
                </div>
                <div>
                    <el-switch v-model="inputForm1.hasStatus3" /> &nbsp;
                    <span>Hộ chiếu (Passport)</span>
                </div>
                <div>
                    <el-switch v-model="inputForm1.hasStatus4" /> &nbsp;
                    <span>Thị thực (Visa)</span>
                </div>
                <div>
                    <el-switch v-model="inputForm1.hasStatus5" /> &nbsp;
                    <span>Chứng minh nhân thân</span>
                </div>
                <br />
                <el-input v-model="inputForm1.note1" placeholder="Ghi chú"></el-input>
                <h4>2. Kiểm tra thông tin quan trọng của các hồ sơ</h4>
                <div>
                    <el-switch v-model="inputForm1.checkStatus1" /> &nbsp;
                    <span>HS chứng minh học phí đúng thời gian thực tế không?</span>
                </div>
                <div>
                    <el-switch v-model="inputForm1.checkStatus2" /> &nbsp;
                    <span>Hộ chiếu còn hiệu lực không?</span>
                </div>
                <div>
                    <el-switch v-model="inputForm1.checkStatus3" /> &nbsp;
                    <span>Thị thực còn hiệu lực không?</span>
                </div>
                <div>
                    <el-switch v-model="inputForm1.checkStatus4" /> &nbsp;
                    <span>Quốc gia trên HS học phí và trên thị thực có khớp nhau không?</span>
                </div>
                <div>
                    <el-switch v-model="inputForm1.checkStatus5" /> &nbsp;
                    <span>HS Chứng minh nhân thân có khớp với Hộ chiếu, thị thực không?</span>
                </div>
                <br />
                <el-input v-model="inputForm1.note2" placeholder="Ghi chú"></el-input>
            </el-col>
        </el-row>
        <br />
        <el-input v-model="inputForm1.rejectReason" autosize type="textarea" placeholder="Lý do từ chối">
        </el-input>
        <br />
        <br />
        <div style="text-align: center;" v-if="inputForm.status == 'APPROVE_WAIT'">
            <el-button type="primary" @click="approvedProfileMethod()" :loading="loaddingApprovedButton">DUYỆT HỒ SƠ
            </el-button>
            <el-button type="warning" @click="rejectProfileMethod()" :loading="loaddingRejectButton">TỪ CHỐI HỒ SƠ
            </el-button>
        </div>
    </span>
    <span v-if="radioModel == 'b'">hợp đồng chuyển tiền</span>
    <!-- <br />
    <br />
    <br /> -->
    <!-- <h1>Base64</h1>
    <vue-pdf-embed :source="source2" /> -->

    <el-dialog v-model="dialogVisible">
        <vue-pdf-embed :source="dialogImageUrl" />
        <!-- <img w-full :src="dialogImageUrl" alt="Preview Image" /> -->
        <!-- <pdf :src="dialogImageUrl" /> -->
        <embed :src="dialogImageUrl" width="100%" style="min-height:500px;" />
    </el-dialog>
</template>
<script lang="ts" setup>
import router from "@/router";
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { FormInstance, FormRules, UploadProps, UploadUserFile } from "element-plus";
import { ElMessage, ElMessageBox } from 'element-plus'
import httpbe from "@/http-be";
// import pdf from 'vue-pdf';
import VuePdfEmbed from 'vue-pdf-embed'
const route = useRoute();
// const source2 = 'data:application/pdf;base64,SlZCRVJpMHhMalVOQ2lXMXRiVzFEUW94SURBZ2IySnFEUW84UEM5VWVYQmxMME5oZEdGc2IyY3ZVR0ZuWlhNZ01pQXdJRkl2VEdGdVp5aGxiaTFWVXlrZ0wxTjBjblZqZEZSeVpXVlNiMjkwSURFd0lEQW'
const source2 = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
const source1 = 'https://s3.ap-southeast-1.amazonaws.com/pvcb-nhs-dev/eway/check/2022-09-13/Q%C4%90%20Th%C3%A0nh%20l%E1%BA%ADp%20Chi%20%C4%91o%C3%A0n%20NHS.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220914T075127Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIAWAQUFC3LTSJP26CR%2F20220914%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=8b6a36ea7f8f6ed1c7ccc7611b6eb4a7093d4d49e117d07cd53542df3d1c9768'
const id = route.params.id;
const radioModel = ref('a')
const loaddingApprovedButton = ref(false)
const loaddingRejectButton = ref(false)
const fileList = ref<UploadUserFile[]>([
    {
        name: 'common.pdf',
        url: 'https://s3.ap-southeast-1.amazonaws.com/pvcb-nhs-dev/eway/check/2022-09-13/Q%C4%90%20Th%C3%A0nh%20l%E1%BA%ADp%20Chi%20%C4%91o%C3%A0n%20NHS.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220914T075127Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIAWAQUFC3LTSJP26CR%2F20220914%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=8b6a36ea7f8f6ed1c7ccc7611b6eb4a7093d4d49e117d07cd53542df3d1c9768',
    },
    {
        name: 'abc.pdf',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
    {
        name: 'Capture.png',
        url: 'https://recmiennam.com/wp-content/uploads/2018/04/hinh-anh-dep-ve-bien-4.jpg',
    },
    {
        name: 'Capture2.png',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk2QkI4RkE3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk2QkI4Rjk3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU2QTEyNzk3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU2QTEyN0E3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WHowqAAAXNElEQVR42uxda4xd1XVe53XvvD2eGQ/lXQcKuDwc2eFlCAGnUn7kT6T86J/+aNTgsWPchJJYciEOCQ8hF+G0hFCIHRSEqAuJBCqRaUEIEbmBppAIBGnESwZje8COZ+y587j3PLq+ffadGJix53HvPevcuz60xPjec89ZZ+39nf04+9vLSZKEFArFzHA1BAqFEkShUIIoFEoQhUIJolAoQRQKJYhCoQRRKJQgCoUSRKFQKEEUCiWIQrFo+Gv/8/YH+f/nsMWSHHMChyhxqPTTdyncWyJ3ScD/ztipiB3wXSqu6P17avN+TyFC5ggv4tRnmoxWTP1+5F+Mz17GPvPl49EKBWd3UsfXllPiso8VcYtmPba3fNuKrBVXrGFCbrdPwXndFL49ltI367roOpSUI4pGypv9s7q+ltj6JxqOQ07Bo/DgxGb2/a8cX0CnAWXJ5etz2TqdHiXHKlKj9w6i9XX8Ic41DmI8FVHhmmXk85MmRhCzJoiTWnig9LfJRHihgydxzAxJhBr7Bh/hK3yu+p9568FliTJF2aKMZfVd/kQOcKP6OBmS9+Rjm4zJ6faoeN0gOUn61MncLX4CJ+MRhe+P/dRxhfew2Df4CF/hs4jWg8vQYUKYMuWyRRkLjeHQ8YP0Z9mekVjA8Qj3VVcuoeDiXu63lkUE0ym6FA5PXBaNVr7qtPumGyPR4Bt8hK/wWUR5chn6XJYoU5StUHL8l+XEx2axhkS6yk+chJuP4rXLyOkIKJkS0B67adcqfL/0Y4pixxSysK6V8Yl9Mz7i3272NRFlhzJsu24Z5l9E9Ahmwfrpoj7uw3fZtktsRZKjIXnndlLxin7+W8ZTBwPf6I+Tg9HwxK2Ob8citbCoBoaxBxMCvsFH+CqjHCtUvLzflKWUcpwB91gupG5f9/Rtx39ZZBtmWyJtphKzHTQW0diP36b4aJmcLj/zGaSkHJPb4SWFi/tOJd8bTqd9s48VBRh4RKeUX/vjgXg8cpyCmz05xkJylxSoa8M5RF0eJaVIIkGOsg2yTc3UgpD94psiWxEOqDNYoOIXuHnGwE5AXUTFi46FTnRw4l/dwEm7/pSxcYnCF/gE3zInh52RRJkVP7/MlKFQcgCbjifHTAQBfsb2qsgBO3e1Cpf3UXBej3nRJKKrxU/rcH/pKzz4vNIQuRJTEmZklbg6EL4SPsE3GQPzinmfhbJDGQolB+r8w58abs5y8DqRt4ABeptLRR7koY9NleybEYw/MPisvF/ayT1/SvDewcnIcG32wfiCAbEvoCZyGaGsitdyz6XdTctQJq6fcT5mloNfYvu5yFZkpEz+RT0UrFoqpxVBV+vQxIrkaPnrbqdvXs6hcjbU+Jq4Nvvwd/BFRNeq2npwWfkX95iyE9p6PM72P/MhCPANTBSKu5WITHcC074Y9CUTkYglKBgcV/aVtlM5Kpp/RHFjDdfka7MP/2wG6m72661QNigjlBXKTGBtsjWKNs5atCf44Uds3xc5YD8Wknd2BxWuGjCzIxLWQzlFj+IjU108OL7bafM5sm5DDdfka/8T+9AJXyTMpqFsUEYoK5SZ0NbjVlvX500Q4Ha2A+JuCcEvhVS8qp/8MzspHhMSfO7mVPaP35BMRp9JsCQldbX+hmvxNfnamzJfqVvtWnGZoGxQRigroYs6UbfvOGHn4ORVkTaIbEWwtqg3MNO+Zql0JGCdVuCayhDuG9uJB7vp+oR17FbZc+NauCauLWLmKkqXr6NsUEYoK6GtxwY6CXXnEs0n2faIHLCPhhR8bikFKwRN+xZddHWu5a7Ol9yCZ2ZwHKdOxufGNeKRqS/hmnLWW1VMmQSrl5oyEkqOPbZu02IJAsic9sU7B+5uF9cOmqUfeLOdOaAZYb/CA+M/Ic9NxUoYMNfD/PT84f7xB807EAnrrbgMUBZt1w1SEpCIqfjF1Om5EuQNth0iu1r8tPLP76LCpX2yWpHDk2dGH018p6brtD5hOHf04cR3okOTZ0lqPVAW3gVdlMhdrfsTW6drRhDgRrYJcbeKZQxTkenvegNt6YBQwrQvOxG+P3ZHEia9TuClS9Br1XKge8XnxLlxjelzZ/2w4tijDMxyoHIsVQg1zvYPcy7KeZx4jG2zyFakFJF7Whu1XT2QvhfJeryeVNdplYPo4Pi9hKd7VVxVC8O5cH4+N65hXgoKuGfEHmWAskjGxI49Ntu6XHOCAD9ie1PcLSepjDNY00fB8m6KpSyJx/jgg9LfJEfLK40818w+LXY5e5zKaMfKl+DcIlSCZp0cd3U59igDI4+WOa2LunvfvDoD9RrcNLqAjDy3yzfrtKqbAkggSDIZmSlYxzz9a8BaJ101zF2rh3BuSTJaCKGMDEGujHbedXch0X2ebbdEkkDC6a9cQoWVguS53P0JP5xcHY1W/tppD9KxgrdAw5QxnwPn4nOukrPeqkzBJb0m9oJltLtt3a07QYD1IkMAeS7/hw0BXMhzJwXJc/eV7kuiyIN8OOGuUhLP06JUeoxz4FxiZLRouTsDM9WO2OdBRtsIgrzHtk3kgH00JO+cTipc2S9jqyCaluf2xwcnfuB6LndHuEsSzdP4N/gtzoFzSZHRIsaQQiPmidyXgttsnW0YQYDvsh2ROGBPxkMqXjNA/qlCFsnZ8UdlX+kfk0pymlnMWH2JOBfz0sWI+C3OMS1dzPphhPVWHOPC5wdMzIUOzFFHb1lwB2ARF+ZOPt0gshWBPLe/wCRZlu6CIkSei/cE0fD4g2ZbVWceyxH5WPwGvzXrrSTJaDnG7oBoGS3qaCULggCPsv1W5IAd8tzLllJwvpx1WthMIfyg9OVotHy1WVQ4V37wsfgNfkuSZLQcW8Q4lruU/RVbRykrggDXiwwN3uQWnXTa1xMkz2W/on2lndNajpNtAGePw2/MOicBMlqs+8K7GBNbjrFgGe2iX0nUgiAvs+0S2YpgndaFPVRc3SdmVanZlfGjifOiw5PrT/oGvPpG/vDkEH4jZ70Vt86rl5rYimmdP41/s3Uzc4Isup9XNxwvz+0tyNAlONPrtO6hctR+QnluKqNt52O3pxvtClhvxTH0egtmEwbBMlrUxU21OFGtCHKYbavIATv3j90z26kIea4QZRtahfhIuT0anrjH7O3rpjNVHzPIaLG3Lh8Tj5TbRQihjlNyehxTwTLarbZOiiEIcBfbPnGhMtroChXW9JN/VqeYdyPEY4nwwPj6ZCL8C1T+T61JhDqRv8MxZgwlJG2BxzEsrBmgeEzseqt9ti6SNIIA8t6wm901eFDZ66d7M4UkQ56LVgTTvvtKaRqFqoTWymjxGb6LpUzrImYcuzaOIWKJmAptPWpaB2sd+V+yvSB1wB6s7qXgwiUyBpbJdBqFq6MjU18mKCKhRsTyEbx558/wnRmYJzLiV+DYBat6JQ/MX7B1UCxBAKHy3IQrH6W7MhY9MWkUMNAN948/8Mm35/jMDIKlpC3gmBWQtsAjifkE61b36kGQP7DdL7KrVZXnXiYpjYKZxj09Gh7f4kB4yIa/8ZmU1brIIYiYIXaJ3Nbjflv3xBME+DZbSVwIzfIIK89dJkSea18Ihu+XflD9yPztCJnW5Ri5VRntpNh8giVb5ygvBIHu9yaRrchYRO6fFU0CSTPQlDLte6zshx9O3g3D3yJajySd4EDaAsQMsRPaetxk61zty+YTCXRqjf9jO19cOLnyYV+p8QffpcreMXJ7BeRgh77Ds6SIYhGbMBgB2tld1DW0nGL4VxbZfKBbdUHdhol1dl7mOi0MOjttGgWT11lAwU9r1mMSsX0oxwSxgYyWOvKXtiAvBPkV239I7GqZdVqX9FDw2V5+UoYipn2nt/WRMK3LMQlW9poYCZ7WfcrWsdwSBNggMrRYdcLdhjas0+q28lzJOc8bOU7jWLh2AwzEyLxclYm6Z2ZuBEE+YLtTZEVA9tzPdBh5biJ3q5rGD8yRjXbNAPkcm0RuyjTUqf3NQBDge2yHJFaGeDyi4tUD5J3WIXmzs8Y9NDgG3un80OCYIDZCHxqHbJ2iZiEIGmnB8twgzYIkd7vMxiBON59GLJyBQLKMdiM1qOPXyMn2f2f7X5EDdshzkUbhAtED0oZMXCAGiIXgtAW/YXusURdr9NsoufLcgmP20zKy2ErrNSNGRuunMUAshL7zABq61q/RBPkd2yNSn57+X3ZTQZA8t7H3H5p7RwwEt6KP2DrUtAQBIIUsiwt99Kf+tydFntuocVhVRltNWyBTRlumGslopRNkhO1mkRVlLCT3jHYzqyU48WSN+1ZWRou0BZDRyp3Ju9nWnaYnCHA3216JlQWy0gKy557dJSaNQn0nKNL1VrhnwTLavbbOUKsQBBApzzVpFHqsPFdIGoW6AfeG7cMwrcv3TC0io80LQZ5me07kU3WkYqSlhYvkpFGoz8C8bO7RyGjlpi14ztaVliMIIFOeizQKbpI+WdsDGfLcWvcmsaK53b4gdUW3lENZXjxrgrzNdq/IAftohbzzOql4eV/zjUUcu96K7w33KFhGi7rxVisTBEBSxWPiiqYqz71mGfmDQuS5tSIHstHyPZnd7+XKaI+RgKSxEggySWmKaXkVaSwi5xSbRmGiSdZpxVZGy/eEexMso73R1o2WJwiwk+11kQNZrNO6oo+Cc7vz39Wy07q4l+CKfnNvQu/ndVsnSAkifcCOAXq7R8W1y9JdRvI87QvfnTRtgdPeujLavBLkv9meEPnUHS2Tf1EPFT67lOKRnE77munrsrkH/+IeydPXqAO/VoLMDMhz5T2irTzXpFHoKeRPnluV0XYX0mlduTLamIRJtKUR5CDbbSIrGPfX/eUdVFyTQ3luku6OaNIW/HmH5LQFt9k6oAQ5Ab7PNiyxkmGndUhRvTNyJM9F1wrZaM9IZbQmG63MocewxIejRIKg+DaKbEXGI3KWBtT2hUFKyonUZeEfB3xkX4vsM3wXvIx/IwmMqCu0WH/B9qLIpzG6Wp/rpWBFj/x1WnaCAb4G7LPgad0XbZmTEmTukDnti0yzgZvKcwNPtDzXyGjZR5ONFincVEbbVAR5je0hkU/lkTL5F3TZzQ2EvjysJr1hH/0LuiVPTz9ky1oJsgB8iwQsN5hplISns5Hn9hXl9eurMlr2zUzrVsQuk5m0ZUxKkIXhKNsWkQN2yHNPhzx3WbqQMRZGYCOjXWZ8FDzjtsWWsRJkEfgh2zvyOvhWnovsucu75GTPtdlo4RN8i+W+s3nHli0pQRaPIXEeVeW53V46YJciz2Uf4IvxiX0juW/9h/JQ8fJCkGfZnpE5YK9QsHIJBZcIkOdW141d3Gt8EiyjfcaWqRKk6Z84kOc6duODjmzluUZGyz4g6Q18UhltaxHkXbbtIgfsRyvknQt5bobZc6dltP3Gl0SudmW7LUslSJ1mPUbFeWVUepDnDpB3SgazRtW0BXxt+ABfhE7rypyVbCKCTLF9U2QrgjQKg3b7zskGv3eI0+XsuDZ8EJy2YJMtQyVIHfEztldFDtghz728j4LzGphGoZq2gK9ZMDuwiH3ngTJ7OG+VLY8EAeTKc9ts9lwk42zEOi2st+JrYZIA1xYso12Xx4qWV4K8xPZzka3ISCrPDVY1YJ1WtfVYZWW0ctdbPW7LTAnSQHyDJCoykEYhTNdpuUsK6YDZqQ85cG5cw6y3CsWmLYBXG/NayfJMkI8oVR/KG7AfC8k7u4MKVw2kM1r1eB2RpDNXuAauJVhGe6stKyVIBrid7YA4r6o5N5BG4cxOI3mtaeWtymj53LiG4FwmKJs78lzB8k4QVIsN4ryqynN7AzP1ShXIc2tYg3GuSpJO6/aKltHK3KWmhQgCPMm2R+SAfTSkANlzV9Rw2rc6MDcyWtHZaPfYsiElSPaQOYVYiSnxiIprB8kpeGn+v8U2mZD8FjxzTpybKjqtqwQ5Od5g2yGyq4Xsued3UeHSvsW3IlUZLZ8L5xSctmCHLRMliCBgN/AJcV7F6SpbjBe8gUWkUaimLeBzmOUsU2JltOMkcbd+JQiNkYB8ErNVbPe0Nmq72i4kXMiwNUnfe+AcOJfgfCWbbVkoQQTiR2xvivPKynODNX0ULF9AGoVq2gL+Lc4hWEaL2N/XTBWq2Qgic3BYled2+ekeVfOV51az0WKNF59DsIx2XbNVpmYkyPNsuyWSBBJYf+USKsxHnlvNRsu/8WXLaHfb2CtBcoD1Ir2CPJf/wxSt2xmkupGT9c6QtoCPNdO66FfJldGub8aK1KwEeY9tm8gB+2hI3jmdVLii/+RbBdktfHAsfpPIfSm4zcZcCZIjfJftiMQBO1IQQBrrn3qCRYZ20SOOMTLacbHrrRDjW5q1EjUzQbiTTzeIbEUgz+232XNne59RfX+CbLT9omW0iHFFCZJPPMr2W5EDdshzL1tKwfkzrNOqrrfi73CMYBntKzbGpATJL64X6RXWZRVtxlnP+VgaBZO2wEu/wzGatkAJUk+8zLZLZCuCdVoXciux+rhVuXYVMD7Dd7Hc9Va7bGyVIE0Amf3kaXnuIHm9qTwXhr/xmWAZbUXk+E4JsmAcZtsqcsAOee6Z7VS08lwY/sZngmW0W21MlSBNhLvY9onzCqtIxipUuKqf3L6iMfyNz4RO6+6zsWwJ+NRawNvep8S1IhMxucie+8VT0o+6PIqPiB17rG+lCtNqBPkl2wts14gbsCONwqVLzT8Fr7d6wcawZeBS60Hm1GSSTu+a6d5EY6cEyQ5/YLtf4oCd4iQ1ma3H/TZ2SpAWwLfZSqSYK0o2ZqQEaQ1AN32T1vs54yYbMyVIC+GBVuwyLLBL+kCr3rzb4oV/vdZ/jZESZHb8iqS9F5GFp2yMlCAtjCENgcZGCTI79rPdqWH4FO60sVGCKOh7bIc0DNM4ZGNCShAFEFKOsyDVARttTJQgGoJpPMb2Gw2DicFjGgYlyExYpyHQGChBZsfv2B5p4ft/xMZAoQSZFZso3TKo1VC2965QgpwQI2w3t+B932zvXaEEOSnuZtvbQve7196zQgkyZ6zXe1UoQWbH02zPtcB9PmfvVaEEmTeG9B6VIIrZ8RbbvU18f/fae1QoQRYMJKU81oT3dYwkJj1VguQOk9REaY2Pw4323hRKkEVjJ9vrTXQ/r9t7UihBaobr9V6UIIrZ8Wu2J5rgPp6w96JQgtQcG2jmhGl5QWzvQaEEqQsOst2WY/9vs/egUILUtZIN59Dv4ZyTWwmSEyDnUx7luRtJar4qJUjT4RdsL+bI3xetzwolSMOwTn1Vgihmx2tsD+XAz4esrwolSMPxLZK9XGPS+qhQgmSCo2xbBPu3xfqoUIJkhh+yvSPQr3esbwolSOYYUp+UIIrZ8SzbM4L8ecb6pFCC6BNbWw8lSB7wLtt2AX5st74olCDikPWskfRZNSVIi2OKst2+c5P1QaEEEYuH2V7N4Lqv2msrlCDisa5FrqkEUSwIL7E93sDrPW6vqVCC5AaN0l/kVZ+iBGlxfMR2awOuc6u9lkIJkjvcwXagjuc/YK+hUILkEgnVdxeRDfYaCiVIbvEk2546nHePPbdCCZJ7rMvJORVKkEzwBtuOGp5vhz2nQgnSNMBu6uM1OM84Nedu80qQFscY1SYfx2Z7LoUSpOlwH9ubi/j9m/YcCiWIDth1YK4EaUU8z7Z7Ab/bbX+rUII0PdY36DcKJUgu8R7btnkcv83+RqEEaRncwnZkDscdsccqlCAthQrbDXM47gZ7rEIJ0nJ4lO2VE3z/ij1GoQRpWaxb4HcKJUhL4GW2XTN8vst+p1CCtDw+Oc6Y6/hEoQRpCRxm23rcv7fazxRKEIXFXZRuwBDZvxUC4GsIREHflguDkyQqaVYotIulUChBFAoliEKhBFEolCAKhRJEoVCCKBRKEIVCCaJQKJQgCoUSRKFQgigUShCFIhP8vwADACog5YM65zugAAAAAElFTkSuQmCC',
    }
])
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
    console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
    console.log(uploadFile)
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
    ElMessage.warning(
        `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
        } totally`
    )
}
const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
    return ElMessageBox.confirm(
        `Cancel the transfert of ${uploadFile.name} ?`
    ).then(
        () => true,
        () => false
    )
}
const inputForm = ref({
    id: "",
    bankType: "pvcb",
    code: "",
    money: Number(),
    accountNumber: "",
    targetTransfer: "A",
    objectTransfer: 'nome',
    moneyType: "",
    balance: Number(),
    rate: Number(),
    rateUSD: Number(23235),
    internalFees: "sendType",
    externalFees: "recieveType",
    moneyShow: Number(),
    moneyPay: Number(),
    moneyTypeChoose: "USD",
    targetTransferLabel: "",
    status: '',
    idLockAmount: ""
});
const inputForm1 = reactive({
    check: "",
    rejectReason: "",
    note1: "",
    note2: "",
    hasStatus1: false,
    hasStatus2: false,
    hasStatus3: false,
    hasStatus4: false,
    hasStatus5: false,
    checkStatus1: false,
    checkStatus2: false,
    checkStatus3: false,
    checkStatus4: false,
    checkStatus5: false

})
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const expandDialogVisible = ref(false)

// const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
//     console.log(uploadFile, uploadFiles)
// }

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}

const formatterCurrency = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
});
const rulesData = reactive<FormRules>({
    check: [{ required: true, message: "Thông tin không được để trống" }]
})
function downloadFileMethod() {
    alert("download")
}
function goBackMethod() {
    router.push({
        name: "listCheckName",
    });
}
function approvedProfileMethod() {
    loaddingApprovedButton.value = true
    ElMessageBox.confirm(
        "Bạn có chắc chắn muốn duyệt hồ sơ", "Thông báo",
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Hủy',
            type: 'warning',
        }
    )
        .then(() => {
            approvedMethod('APPROVED')
            unlockAmountMethod()
        }).finally(() => {
            setTimeout(() => {
                loaddingApprovedButton.value = false
            }, 300);
        })
}
function rejectProfileMethod() {
    loaddingRejectButton.value = true
    ElMessageBox.confirm(
        "Bạn có chắc chắn muốn từ chối hồ sơ", "Thông báo",
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Hủy',
            type: 'warning',
        }
    )
        .then(() => {
            approvedMethod('REJECT')
            unlockAmountMethod()
            ElMessage({
                type: 'success',
                message: "Từ chối hồ sơ thành công",
            })
        }).finally(() => {
            setTimeout(() => {
                loaddingRejectButton.value = false
            }, 300);
        })
}
function approvedMethod(status: string) {
    let id = inputForm.value.id;
    httpbe.put(`/check/approved/${id}?status=${status}`).then((resp) => {
        ElMessage({
            type: 'success',
            message: "Duyệt hồ sơ thành công",
        })
        getDataInitial()
    }).catch(err => {
        ElMessage({
            type: 'error',
            message: "Lỗi duyệt hồ sơ",
        })
    })
}
function unlockAmountMethod() {
    let id = inputForm.value.idLockAmount;
    if (id != null) {
        httpbe.post(`/account/unlock-money?id=${id}`).then((resp) => {
            console.log(resp.data.payload)
        });
    }
}


function getDataInitial() {
    let id1 = id;
    httpbe.get(`/check/detail/${id1}`).then((resp) => {
        inputForm.value = resp.data.payload
    });
}
function fetchData() {
    getDataInitial()
}
onMounted(() => {
    fetchData()
});
</script>
<style lang="scss" scoped>
:deep(.el-radio-button__inner) {
    padding: 10px 150px;
}

.el-collapse-text-button {
    color: var(--el-color-primary);

    :hover {
        color: var(--el-color-primary-light-3);
    }
}
</style>