/* Copyright 2017 Telstra Open Source
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

package org.openkilda.messaging.ctrl;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.io.Serializable;
import java.util.List;

/**
 * Defines the payload of a Message representing an command.
 */
@JsonSerialize
@JsonInclude(JsonInclude.Include.NON_NULL)
//@JsonTypeInfo(use = JsonTypeInfo.Id.NAME,
//        include = JsonTypeInfo.As.PROPERTY,
//        property = "action")
//@JsonSubTypes({
//        @JsonSubTypes.Type(value = ListRequestData.class, name = "list")})
public class RequestData implements Serializable {
    /**
     * Serialization version number constant.
     */
    private static final long serialVersionUID = 1L;

    /**
     * Requested action
     */
    @JsonProperty("action")
    private final String action;

    /**
     * Instance constructor.
     *
     * @param action ctrl function name
     * @throws IllegalArgumentException if any of mandatory parameters is null
     */
    @JsonCreator
    public RequestData(
            @JsonProperty("action") final String action) {
        this.action = action;
    }

    public String getAction() {
        return action;
    }
}
